import React from "react";
import { withAdminAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { OrderList } from "../../Components/Page/Order";
import { MainLoader } from "../../Components/Page/Common";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  console.log(data);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result}></OrderList>
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
