import React from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const navigate = useNavigate();
  return (
    <>
      <div>ProductList</div>
      <button
        className="btn btn-success"
        onClick={() => navigate("/product/productUpsert")}
      >
        Add New
      </button>
    </>
  );
}

export default ProductList;
