import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/api.ts";
import CourseCard from "../components/CourseCard.tsx";
import CourseModal from "../components/CourseModal.tsx";
import FilterBar from "../components/FilterBar.tsx";
import SearchBar from "../components/SearchBar.tsx";



interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: number;
  difficulty: string;
  category: string;
  instructor: string;
  enrollment_count: number;
  rating: number;
  time_stamp: Date; 
}

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("fetchCourses did not return an array", data);
          setCourses([]);
          return;
        }

        // Convert time_stamp string to Date objects
        const dateCourses: Course[] = data.map((course: any) => ({
          ...course,
          time_stamp: course.time_stamp ? new Date(course.time_stamp) : new Date(),
        }));

        setCourses(dateCourses);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading courses...</p>;

  // Filter 1: Filter by category
  const categoryFiltered =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  // Filter 2: Filter by search term
  const filteredCourses = categoryFiltered.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className="mb-3">
        <FilterBar
          courses={courses}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>

      {/* Cards Grid */}
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => setSelectedCourse(course)}
            />
          ))
        ) : (
          <p>No courses found matching your criteria.</p>
        )}
      </div>

      {/* Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default Home;
