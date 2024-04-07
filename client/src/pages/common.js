export const handleGoogleSignIn = () => {
  window.open(`http://localhost:5000/auth/google`, "_self");
};

export const getBearerTokenFromCookie = () => {
  const cookies = document.cookie;
  const cookieArray = cookies.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.startsWith("token=")) {
      const token = cookie.substring("token=".length);
      return token;
    }
  }
  return null;
};
