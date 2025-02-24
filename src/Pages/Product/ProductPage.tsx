import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../Apis/productApi";
import { MainLoader, MiniLoader } from "../../Components/Page/Common";
import NotFound from "../NotFound";
import { apiResponse, userModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { useUpdateShoppingCartMutation } from "../../Apis/shoppingCartApi";
import { toastNotify } from "../../Helper";
import {
  ProductComments,
  ProductDetails,
  ProductImageDisplay,
} from "../../Components/Page/Product";

function ProductPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleQuantity = (amount: number) => {
    let newQuantity = quantity + amount;
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
  };

  const handleAddToCart = async (productId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }

    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      productId: productId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });

    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully");
    } else {
      toastNotify("Item couldn't be added to cart!", "error");
    }

    setIsAddingToCart(false);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  if (data === undefined) {
    return <NotFound />;
  }

  return (
    <>
      <h1 className="mt-5 text-center">{data.result.name}</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-1"></div> {/* empty space */}
          <div className="col-6 m-2 p-2">
            <ProductDetails product={data.result} />
          </div>
          <div className="col-4 m-2 p-2">
            <div>
              <div>
                <h5>Price</h5>
                <span className="h4">€{data.result.price}</span>
              </div>
              <div className="mt-3">
                <span
                  className="p-2"
                  style={{ border: "1px solid #333", borderRadius: "30px" }}
                >
                  <i
                    onClick={() => {
                      handleQuantity(-1);
                    }}
                    className="bi bi-dash p-1"
                    style={{ fontSize: "20px", cursor: "pointer" }}
                  ></i>
                  <span className="h4 mt-3 px-3">{quantity}</span>
                  <i
                    onClick={() => {
                      handleQuantity(+1);
                    }}
                    className="bi bi-plus p-1"
                    style={{ fontSize: "20px", cursor: "pointer" }}
                  ></i>
                </span>
                <span className="m-3">
                  {isAddingToCart ? (
                    <button disabled className="btn btn-succes">
                      <MiniLoader />
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleAddToCart(data.result.id)}
                    >
                      Add to Cart
                    </button>
                  )}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <ProductImageDisplay
                images={data.result.productImages.map(
                  (image: any) => image.url
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <ProductComments product={data.result} />
    </>
  );
}

export default ProductPage;
