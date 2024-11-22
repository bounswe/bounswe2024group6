import wretch from "wretch";
import Cookies from "js-cookie";
import { BASE_URL } from "../../lib/baseURL";


// Base API setup for making HTTP requests
const api = wretch(`${BASE_URL}`).accept("application/json");


/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
const getToken = (type: string) => {
  return Cookies.get(type + "Token");
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const register = (email: string, username: string, password: string) => {
    return api.post({ email, username, password }, "/signup/");
  };
  
  const login = (username: string,  password: string) => {
    return api.post({ username , password }, "/login/");
  };
  
  const logout = () => {
    const refreshToken = getToken("refresh");
    const accessToken = getToken("access");
    return api
      .auth(`Bearer ${accessToken}`)
      .post({ refresh: refreshToken }, "/logout/");
  };
  
  const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/refresh/");
  };


export const AuthActions = () => {
  return {
    login,
    handleJWTRefresh,
    register,
    storeToken,
    getToken,
    logout,
    removeTokens,
  };
};
  