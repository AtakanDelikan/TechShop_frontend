import React from "react";
import { apiResponse, laptopModel, userModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useNavigate } from "react-router-dom";

interface Props {
  laptop: laptopModel;
}

function LaptopCard(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleAddToCart = async (laptopId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      laptopId: laptopId,
      updateQuantityBy: 1,
      userId: userData.id,
    });

    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully");
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/laptopDetails/${props.laptop.id}`}>
              <img
                src={props.laptop.image}
                // style={{ borderRadius: "7%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>

          {true && (
            <i
              className="bi bi-star btn btn-success"
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
            >
              &nbsp; %12 discount
            </i>
          )}

          {isAddingToCart ? (
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              <MiniLoader />
            </div>
          ) : (
            <i
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
              onClick={() => handleAddToCart(props.laptop.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={`/laptopDetails/${props.laptop.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {props.laptop.name}
              </Link>
            </p>

            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.laptop.brand}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.laptop.description}
          </p>
          <div className="row text-center">
            <h4>€{props.laptop.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaptopCard;
