import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      setIsAuthenticated(false); // User is not authenticated
      Cookies.remove("username");
    } else {
      setIsAuthenticated(true); // User is authenticated
    }
  }, [navigate]);

  // Show a loading state until authentication is verified
  if (isAuthenticated === null) {
    return <></>;
  }

  // Render the children once authentication is verified
  return <>{children}</>;
};

export default ProtectedRoute;
