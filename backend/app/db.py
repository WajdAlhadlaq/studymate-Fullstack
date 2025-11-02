# This file handles database connection and session management using SQLAlchemy.

from sqlalchemy import create_engine 
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import sessionmaker 
import os 
from dotenv import load_dotenv 

load_dotenv() # Loads environment variables from the root .env file.

# Gets the DATABASE_URL from environment variables, defaulting to a local connection string.
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/studymate_db")

# Creates a DB engine (the primary connection gateway to PostgreSQL).
engine = create_engine(DATABASE_URL)

# Creates a custom Session class factory for database transactions.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This is the base class that all your SQLAlchemy database models (tables) inherit from.
Base = declarative_base()

# Dependency function (used by FastAPI endpoints)
# This function handles opening and closing the database session for each request.
def get_db():
    db = SessionLocal() # Open a new database session.
    try:
        yield db # Returns the session to the FastAPI endpoint.
    finally:
        db.close() # Closes the session reliably (cleanup).

# Utility function to initialize the database structure.
def init_db(base):
    # Creates all tables defined in your models based on the Base metadata.
    base.metadata.create_all(bind=engine)