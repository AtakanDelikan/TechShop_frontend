import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../Apis/productApi";
import { MiniLoader } from "../Components/Page/Common";

function NavSearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isFetching } = useGetFilteredProductsQuery(searchQuery, {
    // Only run the query if searchTerm has a value
    skip: !searchQuery || searchQuery.trim() === "",
  });

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
      if (searchTerm.trim() === "") {
        setSearchQuery("");
      } else {
        setSearchQuery("search=" + searchTerm + "&pageSize=10&pageNumber=1");
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    if (!isFetching) {
      setProductSearchResults(data?.result?.products?.slice(0, 10) || []);
      setCategorySearchResults(
        data?.result?.availableCategories?.slice(0, 7) || [],
      );
    }
  }, [data, isFetching]);

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
    <div ref={searchRef} className="ps-5">
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
          {isFetching ? (
            <li className="list-group-item bg-light">
              <MiniLoader /> Loading...
            </li>
          ) : productSearchResults.length > 0 ? (
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
          {isFetching ? (
            <li className="list-group-item bg-light">
              <MiniLoader /> Loading...
            </li>
          ) : categorySearchResults.length > 0 ? (
            categorySearchResults.map((category) => (
              <li
                key={category.categoryId}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectCategory(category.categoryId)}
                style={{ cursor: "pointer" }}
              >
                {category.categoryName}
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
