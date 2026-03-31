import React, { useState, useEffect } from "react";

interface Props {
  initialValue?: string;
  onSearch: (searchTerm: string) => void;
}

function ProductSearchBar({ initialValue = "", onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);

  // Keep local state in sync if the URL changes from the outside
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="input-group mb-5 position-relative" 
      style={{ width: "300px" }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search for products..."
        style={{ paddingRight: "40px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {searchTerm.length > 0 && (
        <button
          type="button"
          className="btn border-0 text-secondary"
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleClear}
        >
          <i className="bi bi-x-lg" style={{ fontSize: "14px" }}></i>
        </button>
      )}

      <button className="btn btn-primary z-1" type="submit">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}

export default ProductSearchBar;