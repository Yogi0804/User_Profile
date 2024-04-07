import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/admins");
        setAdmins(response.data.admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div>
      <h2>Admin Profile</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            Username: {admin.username}, Email: {admin.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProfile;
