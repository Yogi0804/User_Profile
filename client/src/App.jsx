import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "./components/Navbar";
import useTokenExpiration from "./hooks/useTokenExpiration";

import { Home, UserProfile, AdminProfile } from "./pages";
import { getBearerTokenFromCookie } from "./pages/common";

function App() {
  const token = getBearerTokenFromCookie();
  const isExpired = useTokenExpiration({ token });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isExpired) {
      toast.error("Your session has expired. Please log in again.");
      setShouldRedirect(true);
    }
  }, [isExpired]);

  return (
    <Router>
      <main className="h-full">
        <Navbar />
        {shouldRedirect && <Navigate to="/" replace />}
        <Routes>
          <Route path="/" element={<Home {...{ isExpired }} />} />
          <Route path="/profile" element={<UserProfile {...{ token }} />} />
          <Route path="/admin" element={<AdminProfile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
