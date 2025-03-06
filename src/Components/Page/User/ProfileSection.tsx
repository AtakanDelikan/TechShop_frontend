import React, { useState } from "react";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "../../../Apis/authApi";

function ProfileSection() {
  const { data, isLoading } = useGetUserDataQuery(null);
  const [updateUser] = useUpdateUserDataMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load initial data when available
  React.useEffect(() => {
    if (data?.result) {
      setUserData({
        name: data.result.name,
        email: data.result.email,
        phone: data.result.phoneNumber,
        address: data.result.address,
      });
    }
  }, [data]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("Name", userData.name);
      formData.append("Email", userData.email);
      formData.append("PhoneNumber", userData.phone);
      formData.append("Address", userData.address);
      await updateUser(formData).unwrap();
      setIsEditing(false);
      toastNotify("Updated profile", "success");
    } catch (error) {
      toastNotify("Failed to update profile", "error");
    }
  };

  if (isLoading) {
    return <MiniLoader />;
  }

  return (
    <div className="card mb-4">
      <div className="card-header">Profile Information</div>
      <div className="card-body">
        {isEditing ? (
          <>
            <div className="mb-2">
              <label className="form-label">
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">
                <strong>Phone:</strong>
              </label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">
                <strong>Address:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {data.result.name}
            </p>
            <p>
              <strong>Email:</strong> {data.result.email}
            </p>
            <p>
              <strong>Phone:</strong> {data.result.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {data.result.address}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileSection;
