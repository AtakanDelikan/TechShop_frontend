import React, { useImperativeHandle } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetLaptopByIdQuery } from "../Apis/LaptopApi";
import { useDispatch } from "react-redux";
import { setLaptop } from "../Storage/Redux/laptopSlice";
import { useNavigate } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "../Components/Page/Common";
// user id - 79728ebc-c531-473e-a02c-bdcd0566bdcf
function LaptopDetails() {
  const { laptopId } = useParams();
  // const dispatch = useDispatch();
  const { data, isLoading } = useGetLaptopByIdQuery(laptopId);
  // useEffect(() => {
  //   if (!isLoading) {
  //     dispatch(setLaptop(data.result));
  //   }
  // }, [isLoading]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleQuantity = (amount: number) => {
    let newQuantity = quantity + amount;
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
  };

  const handleAddToCart = async (laptopId: number) => {
    setIsAddingToCart(true);

    const response = await updateShoppingCart({
      laptopId: laptopId,
      updateQuantityBy: quantity,
      userId: "79728ebc-c531-473e-a02c-bdcd0566bdcf",
    });

    // console.log(response);

    setIsAddingToCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data.result.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result.brand}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                %12 discount
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.result.description}
            </p>
            <span className="h3">€{data.result.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => {
                  handleQuantity(-1);
                }}
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                onClick={() => {
                  handleQuantity(+1);
                }}
                className="bi bi-plus p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-succes form-control">
                    <MiniLoader />
                  </button>
                ) : (
                  <button
                    className="btn btn-success form-control"
                    onClick={() => handleAddToCart(data.result.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.result.image}
              width="100%"
              // style={{ borderRadius: "50%" }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "%100" }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  );
}

export default LaptopDetails;
