from fastapi import APIRouter, Depends, Query, HTTPException # Imports FastAPI tools for routing, dependency injection, and error handling.
from sqlalchemy.orm import Session # Imports the SQLAlchemy session object for database interaction.
from ..db import get_db # Imports the dependency function that manages opening/closing the database session.
from ..models import Course # Imports the SQLAlchemy model representing the 'courses' table.
from ..schemas import CourseSchema # Imports the Pydantic schema used to format single course API responses.
from typing import List, Optional # Imports type hints for lists and optional parameters.
from pydantic import BaseModel # Imports the base class for defining response models.
from sqlalchemy import func # Imports SQLAlchemy's functional API for aggregate operations (like COUNT, AVG).

# Creates a new router instance. This allows you to group related endpoints (like all /courses endpoints).
router = APIRouter()

# --- Pydantic Schema for Category Statistics ---
# Defines the exact structure for reporting category summary data back to the frontend.
class CategoryStats(BaseModel):
    name: str # The name of the category.
    count: int # The number of courses in that category.
    avg_rating: float # The calculated average rating for courses in that category.


# -----------------------------------------------------------
# Endpoint 1: GET /courses (Main Course Listing with Filters)
# -----------------------------------------------------------
# Defines the main endpoint to retrieve a list of courses. The response is a list formatted by CourseSchema.
@router.get("/courses", response_model=List[CourseSchema])
def get_courses(
    db: Session = Depends(get_db), # Dependency: Automatically receives a database session for the request.
    # Query parameters are optional filter/sort options provided by the user in the URL (e.g., ?search=python).
    search: Optional[str] = Query(None, description="Search by name or description"),
    category: Optional[str] = Query(None, description="Filter by category"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    sort_by: Optional[str] = Query(None, description="Sort by rating, price, enrollment_count"),
    order: Optional[str] = Query("asc", description="Sort order: asc or desc")
):
    # Starts the base query to select all courses.
    query = db.query(Course)

    # --- Filtering Logic ---
    if search:
        # Applies a case-insensitive search filter across both the name AND description fields.
        query = query.filter(
            (Course.name.ilike(f"%{search}%")) |
            (Course.description.ilike(f"%{search}%"))
        )
    if category:
        # Filters results to include only courses matching the specified category name.
        query = query.filter(Course.category == category)
    if difficulty:
        # Filters results to include only courses matching the specified difficulty level.
        query = query.filter(Course.difficulty == difficulty)

    # --- Sorting Logic ---
    if sort_by:
        # Gets the attribute object (e.g., Course.rating) based on the user's input string.
        sort_attr = getattr(Course, sort_by, None)
        if sort_attr is not None:
            # Applies descending order if the user requests "desc".
            if order.lower() == "desc":
                sort_attr = sort_attr.desc()
            # Applies the final sorting rule to the query.
            query = query.order_by(sort_attr)

    # Executes the final filtered and sorted query to fetch the data.
    courses = query.all()
    # Returns the list of course objects, which FastAPI automatically converts to JSON using CourseSchema.
    return courses


# -----------------------------------------------------------
# Endpoint 2: GET /courses/{course_id} (Fetch Single Course)
# -----------------------------------------------------------
# Defines the endpoint to fetch one course using its ID (a path parameter).
@router.get("/courses/{course_id}", response_model=CourseSchema)
def get_course(course_id: int, db: Session = Depends(get_db)):
    # Queries for a course that matches the provided ID.
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        # If no course is found, returns a standard HTTP 404 (Not Found) error.
        raise HTTPException(status_code=404, detail="Course not found")
    # Returns the single course object.
    return course


# -----------------------------------------------------------
# Endpoint 3: GET /categories (Fetch Category Statistics)
# -----------------------------------------------------------

# Defines the Pydantic model for the overall response structure.
class CategoriesResponse(BaseModel):
    categories: List[CategoryStats] # Contains a list of category statistic objects.

# Defines the endpoint to fetch summary data for all course categories.
@router.get("/categories", response_model=CategoriesResponse)
def get_categories(db: Session = Depends(get_db)):
    # Executes a complex SQL query to group courses by category.
    results = (
        db.query(
            Course.category,
            func.count(Course.id).label("count"), # Calculates the total number of courses per category.
            func.avg(Course.rating).label("avg_rating") # Calculates the average rating per category.
        )
        .group_by(Course.category) # Groups the results by the category name.
        .all()
    )

    # Converts the raw SQL result objects into the Pydantic CategoryStats format.
    categories = [
        CategoryStats(name=r.category, count=r.count, avg_rating=round(r.avg_rating, 2))
        for r in results
    ]

    # Returns the data wrapped in the final CategoriesResponse model.
    return {"categories": categories}


# -----------------------------------------------------------
# Endpoint 4: GET /categories/{category}/second-highest (Advanced Query)
# -----------------------------------------------------------
# Defines the endpoint to find the second highest-rated course in a specific category.
@router.get("/categories/{category}/second-highest", response_model=CourseSchema)
def get_second_highest_course(category: str, db: Session = Depends(get_db)):
    # Queries courses filtered by the category.
    courses = (
        db.query(Course)
        .filter(Course.category == category)
        .order_by(Course.rating.desc()) # Orders the results from highest rating to lowest.
        .limit(2)  # Limits the results to only the top two courses.
        .all()
    )

    # Checks if we successfully retrieved at least two courses.
    if len(courses) < 2:
        # If not, returns a 404 error explaining the context.
        raise HTTPException(
            status_code=404,
            detail="Less than 2 courses found in this category"
        )

    # Since the list is ordered DESC (highest first), the course at index 1 is the second highest.
    return courses[1]