import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text bg-white border-end-0">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control border-start-0"
        placeholder="Search Courses..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
