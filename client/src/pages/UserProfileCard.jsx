import axios from "axios";
import React, { useState } from "react";
import { getBearerTokenFromCookie } from "./common";

const UserProfileCard = ({ userProfile }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleChangeImage = () => {
    axios.put(
      `http://localhost:5000/user/profile/${userProfile?._id}`,
      {
        photo: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${getBearerTokenFromCookie()}`,
        },
      }
    );
  };

  return (
    <div className="px-5 mx-auto flex justify-between items-center max-w-md bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <img
        className="w-20 h-20 rounded-full object-cover object-center"
        src={
          userProfile?.profile?.photo || "https://i.stack.imgur.com/l60Hf.png"
        }
        alt="avatar"
      />

      <div className="py-4 px-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {userProfile?.profile?.name || userProfile?.userName}
        </h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input"
            placeholder="Change image via URL"
          />
          <button
            onClick={handleChangeImage}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg h-fit"
          >
            Submit
          </button>
        </div>

        {userProfile?.profile?.bio ? (
          <p className="py-2 text-lg text-gray-700">
            {userProfile?.profile?.bio}
          </p>
        ) : (
          <input className="input" placeholder="Add bio" />
        )}

        <input className="input" placeholder="Add/Edit phone number" />

        <div className="flex items-center mt-4 text-gray-700">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
          </svg>
          <h1 className="px-2 text-sm">{userProfile?.email}</h1>
        </div>
        <input className="input" placeholder="Edit Password" />
      </div>
    </div>
  );
};

export default UserProfileCard;
