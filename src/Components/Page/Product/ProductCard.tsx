import React from "react";
import { apiResponse, userModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useNavigate } from "react-router-dom";

interface Props {
  product: any;
}

function ProductCard(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleAddToCart = async (productId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      productId: productId,
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
            <Link to={`/product/${props.product.id}`}>
              <img
                src={
                  props.product.productImages?.[0]?.url ||
                  "https://placehold.co/600x400/EEE/31343C"
                }
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
              &nbsp; Rating {props.product.rating?.toFixed(2)}
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
              onClick={() => handleAddToCart(props.product.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={`/product/${props.product.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {props.product.name}
              </Link>
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.product.description}
          </p>
          <div className="row text-center">
            <h4>€{props.product.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
