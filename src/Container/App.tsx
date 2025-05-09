import React from "react";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  AllOrders,
  AuthenticationTest,
  AuthenticationTestAdmin,
  CategoryAttributes,
  CategoryList,
  Home,
  Login,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  ProductPage,
  ProductList,
  ProductUpsert,
  Register,
  ShoppingCart,
  CategoryPage,
  UserPage,
  ProductSearch,
  BulkImport,
  SalesAnalytics,
  CategoryUpsert,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { jwtDecode } from "jwt-decode";
import { userModel } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";

function App() {
  const dispatch = useDispatch();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data, isLoading } = useGetShoppingCartQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data?.result?.cartItems));
    }
  }, [data]);

  return (
    <div>
      <Header />
      {/* adding some marginBottom to offset footer */}
      <div style={{ marginBottom: "56px" }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route
            path="/order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route
            path="/order/orderDetails/:id"
            element={<OrderDetails />}
          ></Route>
          <Route path="/order/allOrders" element={<AllOrders />}></Route>
          <Route
            path="/category/categorylist"
            element={<CategoryList />}
          ></Route>
          <Route
            path="/category/categoryUpsert/:id"
            element={<CategoryUpsert />}
          ></Route>
          <Route
            path="/category/categoryUpsert"
            element={<CategoryUpsert />}
          ></Route>
          <Route
            path="/category/categoryAttributes"
            element={<CategoryAttributes />}
          ></Route>
          <Route
            path="/product/categoryAttributes"
            element={<CategoryAttributes />}
          ></Route>
          <Route path="/category/:id" element={<CategoryPage />}></Route>
          <Route path="/product/productList" element={<ProductList />}></Route>
          <Route
            path="/product/productUpsert/:id"
            element={<ProductUpsert />}
          ></Route>
          <Route
            path="/product/productUpsert"
            element={<ProductUpsert />}
          ></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/userPage" element={<UserPage />}></Route>
          <Route path="/search" element={<ProductSearch />}></Route>
          <Route path="/bulkImport" element={<BulkImport />}></Route>
          <Route path="/salesAnalytics" element={<SalesAnalytics />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
