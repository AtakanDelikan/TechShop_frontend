import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import {
  useCreateLaptopMutation,
  useUpdateLaptopMutation,
  useGetLaptopByIdQuery,
} from "../../Apis/LaptopApi";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const laptopData = {
  name: "",
  description: "",
  brand: "",
  price: "",
  cpu: "",
  gpu: "",
  storage: "",
  screenSize: "",
  resolution: "",
  stock: "",
  image: "",
};

function LaptopUpsert() {
  const { id } = useParams();
  const [laptopInput, setLaptopInput] = useState(laptopData);
  const [productImage, setProductImage] = useState(
    "https://placehold.co/800x512.png"
  );
  const [loading, setLoading] = useState(false);
  const [createLaptop] = useCreateLaptopMutation();
  const [updateLaptop] = useUpdateLaptopMutation();
  const navigate = useNavigate();

  const { data } = useGetLaptopByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        brand: data.result.brand,
        price: data.result.price,
        cpu: data.result.cpu,
        gpu: data.result.gpu,
        storage: data.result.storage,
        screenSize: data.result.screenSize,
        resolution: data.result.resolution,
        stock: data.result.stock,
        image: data.result.image,
      };
      setProductImage(data.result.image);
      setLaptopInput(tempData);
    }
  }, [data]);

  const handleLaptopInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, laptopInput);
    setLaptopInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Name", laptopInput.name);
    formData.append("Description", laptopInput.description);
    formData.append("Price", laptopInput.price);
    formData.append("CPU", laptopInput.cpu);
    formData.append("GPU", laptopInput.gpu);
    formData.append("Storage", laptopInput.storage);
    formData.append("ScreenSize", laptopInput.screenSize);
    formData.append("Resolution", laptopInput.resolution);
    formData.append("Brand", laptopInput.brand);
    formData.append("Stock", laptopInput.stock);
    formData.append("Image", laptopInput.image);

    let response;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updateLaptop({ data: formData, id: id });
      toastNotify("Product updated successfully", "success");
    } else {
      //create
      response = await createLaptop(formData);
      toastNotify("Product created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/laptop/laptoplist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">
        {id ? "Edit Product" : "Add Product"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={laptopInput.name}
              onChange={handleLaptopInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={laptopInput.description}
              onChange={handleLaptopInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Brand"
              name="brand"
              value={laptopInput.brand}
              onChange={handleLaptopInput}
            />
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={laptopInput.price}
              onChange={handleLaptopInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter CPU"
              name="cpu"
              value={laptopInput.cpu}
              onChange={handleLaptopInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter GPU"
              name="gpu"
              value={laptopInput.gpu}
              onChange={handleLaptopInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Storage"
              name="storage"
              value={laptopInput.storage}
              onChange={handleLaptopInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Screen Size"
              name="screenSize"
              value={laptopInput.screenSize}
              onChange={handleLaptopInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Resolution"
              name="resolution"
              value={laptopInput.resolution}
              onChange={handleLaptopInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter stock"
              name="stock"
              value={laptopInput.stock}
              onChange={handleLaptopInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Image URL"
              name="image"
              value={laptopInput.image}
              onChange={handleLaptopInput}
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/laptop/laptopList")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Products
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              // src="https://via.placeholder.com/150"
              // src={laptopInput.image}
              src={productImage}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LaptopUpsert;
