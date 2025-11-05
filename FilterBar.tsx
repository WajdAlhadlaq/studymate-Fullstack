import React from "react";

interface FilterBarProps {
  courses: { category: string }[]; 
  selectedCategory: string; 
  onCategorySelect: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  courses,
  selectedCategory,
  onCategorySelect,
}) => {

  // Calculate number of courses per category
  const categoryCounts: Record<string, number> = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Build the list including "All"
  const categories = ["All", ...Object.keys(categoryCounts)];

  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`btn btn-sm ${
            selectedCategory === category ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => onCategorySelect(category)}
        >
          {category}{" "}
          {category === "All"
            ? `(${courses.length})`
            : `(${categoryCounts[category] || 0})`}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
