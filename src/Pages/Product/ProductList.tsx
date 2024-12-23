import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../Apis/productApi";

function ProductList() {
  const navigate = useNavigate();
  // const [deleteProduct] = useDeleteProductMutation();
  const { data, isLoading } = useGetProductsQuery(null);

  const handleProductDelete = async (id: number) => {
    // toast.promise(
    //   deleteProduct(id),
    //   {
    //     pending: "Deleting product",
    //     success: "Product deleted successfully",
    //     error: "An error occured while deleting",
    //   },
    //   {
    //     theme: "light",
    //   }
    // );
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="table p-5">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-success">Product List</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate("/product/productUpsert")}
        >
          Add New
        </button>
      </div>
      <div className="p-2">
        <div className="row border">
          <div className="col-2">Image</div>
          <div className="col-1">ID</div>
          <div className="col-2">Name</div>
          <div className="col-2">Category</div>
          <div className="col-1">Price</div>
          <div className="col-2">Stock</div>
          <div className="col-1">Action</div>
        </div>

        {data.result.length > 0 &&
          data.result.map((product: any, index: number) => (
            <div className="row border" key={product.id}>
              <div className="col-2">
                <img
                  src={product.images && product.images[0]}
                  alt="no content"
                  style={{ width: "100%", maxWidth: "120px" }}
                />
              </div>
              <div className="col-1">{product.id}</div>
              <div className="col-2">{product.name}</div>
              <div className="col-2">{product.category.name}</div>
              <div className="col-1">{product.price}€</div>
              <div className="col-2">{product.stock}</div>
              <div className="col-1">
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/laptop/laptopupsert/${product.id}`)}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleProductDelete(product.id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
