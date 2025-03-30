import React from "react";
import {
  AnalyticsBarChart,
  AnalyticsPieChart,
  OrderRevenueChart,
} from "../Components/Page/SalesAnalytics";
import { useGetSalesAnalyticsQuery } from "../Apis/salesAnalyticsApi";
import { MainLoader } from "../Components/Page/Common";

function SalesAnalytics() {
  const { data, isLoading } = useGetSalesAnalyticsQuery(null);

  if (isLoading) {
    return <MainLoader />;
  }

  // console.log(data);

  return (
    <div>
      <h1 className="m-3" style={{ textAlign: "center" }}>
        Sales Analytics Dashboard
      </h1>
      <div className="m-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <AnalyticsBarChart
                  data={data.result.totalRevenue}
                  title="Total Revenue"
                  yAxisLabel="Revenue (€)"
                />
              </div>
            </div>
            <div className="col">
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <AnalyticsBarChart
                  data={data.result.totalOrders}
                  title="Total Orders"
                  yAxisLabel="Number of Orders"
                />
              </div>
            </div>
            <div className="col">
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <AnalyticsPieChart
                  data={data.result.topSellingCategories}
                  title="Top Selling 5 Categories"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <AnalyticsBarChart
                  data={data.result.totalItemsSold}
                  title="Total Items Sold"
                  yAxisLabel="Number of Items Sold"
                />
              </div>
            </div>
            <div className="col">
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <AnalyticsBarChart
                  data={data.result.uniqueCustomers}
                  title="Unique Customers"
                  yAxisLabel="Number of Unique Customers"
                />
              </div>
            </div>
            <div className="col">
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <AnalyticsPieChart
                  data={data.result.topRevenueByCategories}
                  title="Top 5 Categories by Revenue (€)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderRevenueChart data={data.result.revenueOverTime} />
      <OrderRevenueChart data={data.result.ordersOverTime} isRevenue={false} />
    </div>
  );
}

export default SalesAnalytics;
