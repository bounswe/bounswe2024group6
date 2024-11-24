import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { fetcher } from "../../fetcher";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Add an interface for the auth check response
interface AuthCheckResponse {
  username: string;
  // add other fields your API might return
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const username = Cookies.get("username");

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Make an API call to verify the token
        const response = await fetcher<AuthCheckResponse>(
          `/profile/${username}/`
        );
        setIsAuthenticated(response.username === username);

        if (response.username !== username) {
          navigate("/");
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/");
      }
    };

    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      setIsAuthenticated(false);
      navigate("/");
    } else {
      verifyAuth();
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
