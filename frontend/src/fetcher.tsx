import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "./components/auth/utils";
import { BASE_URL } from "./lib/baseURL";

// Extract necessary functions from the AuthActions utility.
const { handleJWTRefresh, storeToken, getToken } = AuthActions();

const api = () => {
  return (
    wretch(`${BASE_URL}`)
      // Initialize authentication with the access token.
      .auth(`Bearer ${getToken("access")}`)
      // Catch 401 errors to refresh the token and retry the request.
      .catcher(401, async (error: WretchError, request: Wretch) => {
        try {
          // Attempt to refresh the JWT token.
          const { access } = (await handleJWTRefresh().json()) as {
            access: string;
          };

          // Store the new access token.
          storeToken(access, "access");

          // Replay the original request with the new access token.
          return request
            .auth(`Bearer ${access}`)
            .fetch()
            .unauthorized(() => {
              window.location.replace("/");
            })
            .json();
        } catch {
          window.location.replace("/");
        }
      })
  );
};

export const fetcher = <T = unknown,>(url: string): Promise<T> => {
  return api().get(url).json();
};
