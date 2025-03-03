import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSearchedProductsQuery } from "../Apis/productApi";
import { useGetSearchedCategoriesQuery } from "../Apis/categoryApi";

function NavSearchBar() {
  const [productSearchQuery, setProductSearchQuery] = useState<string>("");
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: productData, isLoading: productIsLoading } =
    useGetSearchedProductsQuery(productSearchQuery);
  const { data: categoryData, isLoading: categoryIsLoading } =
    useGetSearchedCategoriesQuery(categorySearchQuery);

  const [productSearchResults, setProductSearchResults] = useState<any[]>([]);
  const [categorySearchResults, setCategorySearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside search bar & dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setShowDropdown(false);
      return;
    }

    // Debounce search (wait 1 seconds after user stops typing)
    const delayDebounce = setTimeout(() => {
      setShowDropdown(true);
      setProductSearchQuery("searchTerm=" + searchTerm + "&pageSize=10");
      setCategorySearchQuery("searchTerm=" + searchTerm + "&count=5");
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    if (!productIsLoading) {
      setProductSearchResults(productData.result.products);
    }
  }, [productData]);

  useEffect(() => {
    if (!categoryIsLoading) {
      setCategorySearchResults(categoryData.result);
    }
  }, [categoryData]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm("");
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSelectProduct = (productId: number) => {
    setSearchTerm("");
    setShowDropdown(false);
    navigate(`/product/${productId}`);
  };

  const handleSelectCategory = (categoryId: number) => {
    setSearchTerm("");
    setShowDropdown(false);
    navigate(`/category/${categoryId}`);
  };

  return (
    <div ref={searchRef}>
      <form className="d-flex" onSubmit={handleSearchSubmit}>
        <div className="input-group" style={{ width: "400px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search for products and categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // onBlur={() => setShowDropdown(false)}
          />
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </form>

      {/* Dropdown for search suggestions */}
      {/* {showDropdown && searchResults.length > 0 && ( */}
      {showDropdown && (
        <ul
          className="list-group position-absolute mt-1"
          style={{ zIndex: 1000, width: "600px" }}
        >
          {/* Products Section */}
          <li className="list-group-item fw-bold bg-light">Products</li>
          {productSearchResults.length > 0 ? (
            productSearchResults.map((product) => (
              <li
                key={product.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectProduct(product.id)}
                style={{ cursor: "pointer" }}
              >
                {product.name}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No products found</li>
          )}
          {/* Categories Section */}
          <li className="list-group-item fw-bold bg-light">Categories</li>
          {categorySearchResults.length > 0 ? (
            categorySearchResults.map((category) => (
              <li
                key={category.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectCategory(category.id)}
                style={{ cursor: "pointer" }}
              >
                {category.name}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No categories found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default NavSearchBar;
