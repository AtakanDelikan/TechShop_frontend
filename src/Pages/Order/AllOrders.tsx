import React, { useState } from "react";
import { withAdminAuth } from "../../HOC";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader, PageSelector } from "../../Components/Page/Common";
import { useNavigate, useSearchParams } from "react-router-dom";
import { orderHeaderModel } from "../../Interfaces";
import { getStatusColor } from "../../Helper";
import { SD_Status } from "../../Utility/SD";

function AllOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const navigate = useNavigate();

  const pageNumber = (() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  })();

  // const { data, isLoading } = useGetAllOrdersQuery(pageNumber);
  const { data, isLoading } = useGetAllOrdersQuery({
    pageNumber: pageNumber,
    status: statusFilter,
  });

  if (isLoading) {
    return <MainLoader />;
  }

  console.log(data);

  const totalPages = data.result.totalPages;
  const totalOrders = data.result.totalOrders;
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // Preserve existing query parameters and update page number
      setSearchParams((prevParams) => {
        const updatedParams = new URLSearchParams(prevParams);
        updatedParams.set("page", newPage.toString()); // Update or add page param
        return updatedParams;
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-success pt-5 ps-5">
          Orders List <h4 className="text-black">{totalOrders} Orders</h4>
        </h1>

        <select
          className="form-control form-select ms-5"
          style={{
            width: "150px",
            backgroundColor: "#e8e8e8",
          }}
          required
          name="dataType"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Orders</option>
          <option value={`${SD_Status.PENDING}`}>{SD_Status.PENDING}</option>
          <option value={`${SD_Status.CONFIRMED}`}>
            {SD_Status.CONFIRMED}
          </option>
          <option value={`${SD_Status.PREPEARING}`}>
            {SD_Status.PREPEARING}
          </option>
          <option value={`${SD_Status.SHIPMENT}`}>{SD_Status.SHIPMENT}</option>
          <option value={`${SD_Status.DELIVERED}`}>
            {SD_Status.DELIVERED}
          </option>
          <option value={`${SD_Status.CANCELLED}`}>
            {SD_Status.CANCELLED}
          </option>
        </select>
      </div>

      <PageSelector
        totalPages={totalPages}
        currentPage={pageNumber}
        onPageSelect={handlePageChange}
      />
      <div>
        <div className="table">
          <div className="p-5">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Date</div>
              <div className="col-2">Status</div>
              <div className="col-1"></div>
            </div>
            {data.result.orderHeaders.map((orderItem: orderHeaderModel) => {
              const badgeColor = getStatusColor(orderItem.status!);
              return (
                <div className="row border" key={orderItem.orderHeaderId}>
                  <div className="col-1">{orderItem.orderHeaderId}</div>
                  <div className="col-2">{orderItem.pickupName}</div>
                  <div className="col-2">{orderItem.pickupPhoneNumber}</div>
                  <div className="col-1">
                    € {orderItem.orderTotal!.toFixed(2)}
                  </div>
                  <div className="col-1">{orderItem.totalItems}</div>
                  <div className="col-2">
                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                  </div>
                  <div className="col-1">
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
      </div>
      <PageSelector
        totalPages={totalPages}
        currentPage={pageNumber}
        onPageSelect={handlePageChange}
      />
    </>
  );
}

export default withAdminAuth(AllOrders);
