import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import flicker from "./flicker.png";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      navigate("/");
    } else {
      setIsAuthenticated(true); // User is authenticated
    }
  }, [navigate]);

  // Show a loading state until authentication is verified
  if (isAuthenticated === null) {
    return <img src={flicker} alt="flicker" className="w-screen h-screen" />;
  }

  // Render the children once authentication is verified
  return <>{children}</>;
};

export default ProtectedRoute;
