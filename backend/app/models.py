#This file defines SQLAlchemy models, which represent the tables in your database

from sqlalchemy import Column, Integer, String, Text, Numeric
from .db import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    image = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)
    difficulty = Column(String, nullable=False)
    category = Column(String, nullable=False)
    instructor = Column(String)
    enrollment_count = Column(Integer, default=0)
    rating = Column(Numeric(3, 2), default=0.0)
    
