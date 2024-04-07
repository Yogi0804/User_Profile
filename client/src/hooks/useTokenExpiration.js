import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getBearerTokenFromCookie } from "../pages/common";

const useTokenExpiration = ({ token }) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const token = getBearerTokenFromCookie();

    const checkTokenExpiration = () => {
      if (!token) {
        setIsExpired(true);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const expirationTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const expired = expirationTime < currentTime;
        console.log({ decoded, expirationTime, currentTime, expired });
        localStorage.setItem("userId", decoded.userId);
        setIsExpired(expired);
      } catch (error) {
        setIsExpired(true);
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 1000 * 60 * 30);

    return () => clearInterval(interval);
  }, [token]);

  return isExpired;
};

export default useTokenExpiration;
