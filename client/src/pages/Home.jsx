import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleGoogleSignIn } from "./common";

const Home = ({ isExpired }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  console.log({ isExpired });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/auth/register", form)
      .then(({ data }) => {
        setIsLoggedIn(true);
        setUserProfile(data.data);
        localStorage.setItem("userId", data.data._id);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.log(error.response.data.error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/profile";
    }
  }, [isLoggedIn]);

  return (
    <>
      {isExpired ? (
        <div
          id="login-popup"
          tabindex="-1"
          className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="#c6c7c7"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    cliprule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close popup</span>
              </button>

              <div className="p-5">
                <h3 className="text-2xl mb-0.5 font-medium"></h3>
                <p className="mb-4 text-sm font-normal text-gray-800"></p>

                <div className="text-center">
                  <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                    Login to your account
                  </p>
                  <p className="mt-2 text-sm leading-4 text-slate-600">
                    You must be logged in to perform this action.
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-2">
                  <button
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleGoogleSignIn}
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="h-[18px] w-[18px] "
                    />
                    Continue with Google
                  </button>
                </div>

                <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                  <div className="h-px w-full bg-slate-200"></div>
                  OR
                  <div className="h-px w-full bg-slate-200"></div>
                </div>

                <form className="w-full">
                  <label for="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <label for="password" className="sr-only">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                    onClick={handleSubmit}
                  >
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Hi</div>
      )}
    </>
  );
};

export default Home;
