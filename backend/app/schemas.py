from pydantic import BaseModel

class CourseSchema(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image: str
    duration: int
    difficulty: str
    category: str
    instructor: str | None
    enrollment_count: int
    rating: float
 
    class Config:
        from_attributes = True
