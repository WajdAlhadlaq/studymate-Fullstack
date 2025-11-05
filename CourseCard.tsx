import React, { useState } from "react";

interface CourseCardProps {
  course: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    duration: number;
    difficulty: string;
    category: string;
    instructor?: string;
    rating: number;
    enrollment_count: number;
    time_stamp: Date;
  };
  onClick: () => void;
}


const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => { 
  const [count, setCount] = useState(0);
  const difficultyColorMap: Record<string, string> = {
    Beginner: "success",
    Intermediate: "warning",
    Advanced: "danger"
  };

  const starColor = { color: "#FFC107" }; 

  return (
    <div
      className="card shadow-sm border-0 rounded-4 overflow-hidden"
      style={{ width: "22rem", cursor: "pointer" }}
      onClick={onClick} 
    >
      
      <div className="position-relative">
        <img
          src={course.image}
          className="card-img-top"
          alt={course.name}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2 px-2 py-1 rounded-3 fw-semibold">
          {course.category}
        </span>
      </div>

      <div className="card-body p-3">
        <h5 className="card-title fw-bold fs-5 mb-2">{course.name}</h5>
        <p className="card-text text-muted mb-3" style={{ fontSize: "0.9rem" }}>
          {course.description}
        </p>

        <div className="d-flex align-items-center gap-2 mb-2 text-secondary">
          <span className="bi bi-clock"> {course.duration} hours</span>
          <span className={`badge bg-${difficultyColorMap[course.difficulty] || "secondary"} ms-2`}>
            {course.difficulty}
          </span>
          <span className="ms-2 bi bi-star-fill"  style={starColor}></span>
          <span>{course.rating}</span>
        </div>

        <div className="d-flex align-items-center mb-3">
          <span className="me-2 text-secondary">
          <img
              src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
              alt="Instructor"
              width="40"
              height="40"
              className="rounded-circle me-2"
            />
          </span>
          <span>{course.instructor}</span>
        </div>

        <h5 className="text-primary mb-3">${course.price}</h5>

        <div
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ gap: "30px" }}
          onClick={e => e.stopPropagation()} 
        >
          <button
            className="btn btn-outline-secondary rounded-circle"
            style={{ width: "30px", height: "30px", padding: 0 }}
            onClick={() => setCount(c => (c > 0 ? c - 1 : 0))}
          >
            −
          </button>

          <span className="fw-semibold">{count}</span>

          <button
            className="btn btn-outline-secondary rounded-circle"
            style={{ width: "30px", height: "30px", padding: 0 }}
            onClick={() => setCount(c => c + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};


export default CourseCard;
