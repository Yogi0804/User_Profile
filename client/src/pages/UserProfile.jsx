import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleGoogleSignIn } from "./common";
import UserProfileCard from "./UserProfileCard";

const UserProfile = ({ token }) => {
  console.log("token", token);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserProfile(response.data.user);
        setLoading(false);
      } catch (error) {
        if (error?.response?.status === 403 || !token) {
          handleGoogleSignIn();
        }
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  console.log(userProfile);
  return (
    <div>{loading ? "loading" : <UserProfileCard {...{ userProfile }} />}</div>
  );
};

export default UserProfile;
