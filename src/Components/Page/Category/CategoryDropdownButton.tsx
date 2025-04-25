import React, { useState } from "react";
import { categoryModel } from "../../../Interfaces";

interface CategoryDropdownButtonProps {
  categories: categoryModel[];
  onSelect: any;
  titleChange?: boolean;
  disabled?: boolean;
  initialTitle?: string;
}

const CategoryDropdownButton: React.FC<CategoryDropdownButtonProps> = ({
  categories,
  onSelect,
  titleChange = true,
  disabled = false,
  initialTitle = "Select Category",
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<categoryModel | null>(null);

  const handleSelect = (category: categoryModel) => {
    if (titleChange) {
      setSelectedCategory(category);
    }

    onSelect(category);
  };

  const renderCategories = (categories: categoryModel[], onSelect: any) => {
    return (
      <ul className="dropdown-menu">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`dropdown-submenu ${
              category.subCategories.length ? "" : ""
            }`}
          >
            <a
              className={`dropdown-item ${
                category.subCategories.length ? "dropdown-toggle" : ""
              }`}
              //   href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSelect(category);
              }}
            >
              {category.name}
            </a>
            {category.subCategories.length > 0 &&
              renderCategories(category.subCategories, onSelect)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="categoryDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        disabled={disabled}
      >
        {selectedCategory?.name || initialTitle}
      </button>
      {renderCategories(categories, onSelect)}
    </div>
  );
};

export default CategoryDropdownButton;
