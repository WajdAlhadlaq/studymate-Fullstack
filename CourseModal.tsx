import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

interface CourseModalProps {
  course: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    duration: number;
    difficulty: string;
    category: string;
    instructor: string;
    rating: number;
    enrollment_count: number;
    time_stamp: Date;
  };
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const [count, setCount] = useState(6); 

  const difficultyColorMap: Record<string, string> = {
    Beginner: "success",
    Intermediate: "warning",
    Advanced: "danger",
  };

  if (!course) return null;

  const lastUpdatedDate = new Date(course.time_stamp).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  
  const primaryBlue = { color: '#007bff' };
  const starColor = { color: "#FFC107" }; 
  const grayColor = { color: '#6c757d' }; 

  const formattedEnrolledText = `${course.enrollment_count.toLocaleString()} enrolled`;

  return (
    <Modal show={true} onHide={onClose} centered size="lg" contentClassName="border-0 shadow-lg">
      <div className="bg-white rounded-3 overflow-hidden">

        {/* Image & Top Section */}
        <div className="position-relative">
          <img
            src={course.image}
            alt={course.name}
            className="w-100"
            style={{ height: "180px", objectFit: "cover" }}
          />
          
          {/* Top Info Bar (Below image) */}
          <div className="px-4 pt-3 pb-2 text-dark bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="fw-bolder" style={{ fontSize: '1.4rem' }}>{course.name}</h4>
              <h5 className="text-primary fw-bold" style={primaryBlue}>
                ${course.price}
              </h5>
            </div>
            
            {/* Instructor and Rating/Enrollment */}
            <div className="d-flex align-items-start mb-3">
              
              {/* Instructor Image */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                alt="Instructor"
                width={40}
                height={40}
                className="rounded-circle me-3"
              />
              
              {/* Instructor Name, Label, and Rating (Stacked) */}
              <div>
                <p className="fw-semibold mb-0" style={{ fontSize: '0.95rem' }}>{course.instructor}</p>
                <p className="text-muted mb-1" style={{ fontSize: '0.8rem' }}>Instructor</p>
                
                {/* Rating and Enrollment */}
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
                    {/* Star Icon and Rating */}
                    <span className="bi bi-star-fill" style={starColor}></span>
                    <span className="fw-semibold text-muted">{course.rating.toFixed(2)}</span>
                    
                    {/* People Icon and Enrolled Count */}
                    <span className="bi bi-people-fill ms-2" style={grayColor}></span>
                    <span className="text-muted">{formattedEnrolledText}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Course Description and Details */}
        <div className="px-4 pb-4">
          <h6 className="fw-bold mt-2 mb-2">Course Description</h6>
          <p className="text-muted" style={{ fontSize: '0.95rem' }}>
            Learn Python from basics to advanced concepts including data structures, OOP, web development, and automation.
          </p>

          {/* Details Section (Light Grey Rectangle Wrapper) */}
          <div className="bg-light p-3 rounded my-4">
            <div className="row g-3">
              {/* Duration */}
              <div className="col-6 d-flex align-items-center">
                <span className="bi bi-clock me-2" style={{ ...primaryBlue, fontSize: '1.2rem' }}></span>
                <div>
                  <p className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>Duration</p>
                  <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{course.duration} hours</p>
                </div>
              </div>
              {/* Difficulty */}
              <div className="col-6 d-flex align-items-center">
                <span className="bi bi-bar-chart-line me-2" style={{ ...primaryBlue, fontSize: '1.2rem' }}></span>
                <div>
                  <p className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>Difficulty</p>
                  <span className={`badge bg-${difficultyColorMap[course.difficulty] || "secondary"} fw-semibold`} style={{ fontSize: '0.75rem' }}>
                    {course.difficulty}
                  </span>
                </div>
              </div>
              {/* Students */}
              <div className="col-6 d-flex align-items-center">
                <span className="bi bi-people me-2" style={{ ...primaryBlue, fontSize: '1.2rem' }}></span>
                <div>
                  <p className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>Students</p>
                  <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{course.enrollment_count.toLocaleString()}</p>
                </div>
              </div>
              {/* Last Updated */}
              <div className="col-6 d-flex align-items-center">
                <span className="bi bi-calendar-check me-2" style={{ ...primaryBlue, fontSize: '1.2rem' }}></span>
                <div>
                  <p className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>Last Updated</p>
                  <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{lastUpdatedDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="my-4" />

          {/* Bottom Section: Counter (Circular) + Enroll Button (Long) */}
          <div className="d-flex align-items-center gap-3">
            
            {/* Counter and Label */}
            <div className="d-flex align-items-center me-auto gap-3">
                <h6 className="fw-bold mb-0 text-muted" style={{ fontSize: '0.9rem' }}>Interest Level:</h6>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary rounded-circle"
                    style={{ width: "35px", height: "35px", padding: 0 }}
                    onClick={() => setCount(c => (c > 0 ? c - 1 : 0))}
                  >
                    −
                  </button>
                  <span className="fw-bold">{count}</span>
                  <button
                    className="btn btn-outline-secondary rounded-circle"
                    style={{ width: "35px", height: "35px", padding: 0 }}
                    onClick={() => setCount(c => c + 1)}
                  >
                    +
                  </button>
                </div>
            </div>

            {/* Enroll Button */}
            <button 
                className="btn btn-primary fw-bold flex-grow-1 px-4 py-2"
                style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom Close Button for the Modal */}
      <button
        onClick={onClose}
        className="btn btn-light position-absolute top-0 end-0 mt-2 me-3 rounded-circle shadow-sm"
        style={{ zIndex: 1050 }}
      >
        ✕
      </button>
      
    </Modal>
  );
};

export default CourseModal;
