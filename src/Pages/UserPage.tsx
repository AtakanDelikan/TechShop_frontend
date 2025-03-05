import React, { useState } from "react";
import { OrderSection, ProfileSection } from "../Components/Page/User";

function UserPage() {
  const [selectedSection, setSelectedSection] = useState("profile");
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Account</h2>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group">
            <a
              className={`list-group-item list-group-item-action ${
                selectedSection === "profile" ? "active" : ""
              }`}
              onClick={() => setSelectedSection("profile")}
            >
              Profile
            </a>
            <a
              className={`list-group-item list-group-item-action ${
                selectedSection === "orders" ? "active" : ""
              }`}
              onClick={() => setSelectedSection("orders")}
            >
              My Orders
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          {/* Profile Section */}
          {selectedSection === "profile" && <ProfileSection />}

          {/* Orders Section */}
          {selectedSection === "orders" && <OrderSection />}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
