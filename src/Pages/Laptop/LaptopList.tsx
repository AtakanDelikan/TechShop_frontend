import React, { useEffect } from "react";
import {
  useDeleteLaptopMutation,
  useGetLaptopsQuery,
} from "../../Apis/LaptopApi";
import { MainLoader } from "../../Components/Page/Common";
import { laptopModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LaptopList() {
  const [deleteLaptop] = useDeleteLaptopMutation();
  const { data, isLoading } = useGetLaptopsQuery(null);
  const navigate = useNavigate();

  const handleProductDelete = async (id: number) => {
    // deleteLaptop(id);
    toast.promise(
      deleteLaptop(id),
      {
        pending: "Deleting product",
        success: "Product deleted successfully",
        error: "An error occured while deleting",
      },
      {
        theme: "light",
      }
    );
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
          onClick={() => navigate("/laptop/laptopupsert")}
        >
          Add New
        </button>
      </div>
      <div className="p-2">
        <div className="row border">
          <div className="col-1">Image</div>
          <div className="col-1">ID</div>
          <div className="col-2">Name</div>
          <div className="col-2">Category</div>
          <div className="col-1">Price</div>
          <div className="col-2">Discount</div>
          <div className="col-1">Action</div>
        </div>

        {data.result.length > 0 &&
          data.result.map((laptop: laptopModel, index: number) => (
            <div className="row border" key={laptop.id}>
              <div className="col-2">
                <img
                  src={laptop.image}
                  alt="no content"
                  style={{ width: "100%", maxWidth: "120px" }}
                />
              </div>
              <div className="col-1">{laptop.id}</div>
              <div className="col-2">{laptop.name}</div>
              <div className="col-2">{laptop.brand}</div>
              <div className="col-1">{laptop.price}</div>
              <div className="col-2">%12</div>
              <div className="col-1">
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/laptop/laptopupsert/${laptop.id}`)}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleProductDelete(laptop.id)}
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

export default LaptopList;
