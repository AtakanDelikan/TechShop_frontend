import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByUserIdQuery } from "../../../Apis/orderApi";
import { RootState } from "../../../Storage/Redux/store";
import { MiniLoader } from "../Common";
import { useNavigate } from "react-router-dom";
import { orderHeaderModel } from "../../../Interfaces";
import { getStatusColor } from "../../../Helper";

function OrderSection() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetOrdersByUserIdQuery(userId);
  const navigate = useNavigate();

  if (isLoading) {
    return <MiniLoader />;
  }

  return (
    <div className="card mb-4">
      <div className="card-header">Order History</div>
      {data?.result?.length === 0 && <div className="p-3">No Past Orders</div>}
      {data?.result?.length !== 0 && (
        <div className="table p-1">
          <div className="p-2">
            <div className="row border">
              <div className="col-2">Order#</div>
              <div className="col-2">Total</div>
              <div className="col-2">Items</div>
              <div className="col-2">Date</div>
              <div className="col-2">Status</div>
              <div className="col-2"></div>
            </div>
            {data?.result?.map((orderItem: orderHeaderModel) => {
              const badgeColor = getStatusColor(orderItem.status!);
              return (
                <div className="row border" key={orderItem.orderHeaderId}>
                  <div className="col-2">{orderItem.orderHeaderId}</div>
                  <div className="col-2">
                    € {orderItem.orderTotal!.toFixed(2)}
                  </div>
                  <div className="col-2">{orderItem.totalItems}</div>
                  <div className="col-2">
                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                  </div>
                  <div className="col-2">
                    <span className={`badge bg-${badgeColor}`}>
                      {orderItem.status}
                    </span>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(
                          "/order/orderDetails/" + orderItem.orderHeaderId
                        )
                      }
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSection;
