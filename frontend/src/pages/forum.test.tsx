import Forum from "./forum";
import { render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { AuthActions } from "../components/auth/utils";

vi.mock("../components/auth/utils", () => ({
  AuthActions: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: "/forum" }),
  Link: ({ children, to }) => (
    <a href={to} data-testid="link">
      {children}
    </a>
  ),
}));

describe("Forum", () => {
  const setupAuthMocks = ({ isGuest = true, isAdmin = false }) => {
    const mockGetToken = vi.fn().mockReturnValue(isGuest ? null : "mock-token");
    const mockUseIsAdmin = vi.fn().mockReturnValue(isAdmin);

    vi.mocked(AuthActions).mockImplementation(() => ({
      getToken: mockGetToken,
      useIsAdmin: mockUseIsAdmin,
      login: vi.fn(),
      handleJWTRefresh: vi.fn(),
      register: vi.fn(),
      storeToken: vi.fn(),
      logout: vi.fn(),
      removeTokens: vi.fn(),
      checkAdmin: vi.fn(),
    }));

    return { mockGetToken, mockUseIsAdmin };
  };

  describe("with guest user", () => {
    beforeEach(() => {
      setupAuthMocks({ isGuest: true });
      render(<Forum />);
    });

    it("should render navbar", () => {
      expect(screen.getByTestId("navbar")).toBeInTheDocument();
    });

    it("should render post card", async () => {
      await waitFor(
        () => {
          expect(screen.getByTestId("post-card")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it("should render post card title and content", async () => {
      await waitFor(
        () => {
          expect(screen.getByText("MockTitle")).toBeInTheDocument();
          expect(screen.getByText("MockDescription")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it("should not allow liking when user is guest", async () => {
      await waitFor(
        () => {
          expect(screen.getByTestId("like-button")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      const likeButton = screen.getByTestId("like-button");
      likeButton.click();

      // The like count should not increase
      await waitFor(() => {
        expect(screen.queryByText("1")).not.toBeInTheDocument();
      });
    });

    it("should not show admin popover for guest users", async () => {
      await waitFor(() => {
        expect(screen.queryByTestId("admin-popover")).not.toBeInTheDocument();
      });
    });
  });

  describe("with authenticated user", () => {
    beforeEach(() => {
      setupAuthMocks({ isGuest: false });
      render(<Forum />);
    });

    it("should allow liking when user is authenticated", async () => {
      await waitFor(
        () => {
          expect(screen.getByTestId("like-button")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      const likeButton = screen.getByTestId("like-button");
      likeButton.click();

      await waitFor(() => {
        expect(screen.getByText("1")).toBeInTheDocument();
      });
    });

    it("should not show admin popover for regular users", async () => {
      await waitFor(() => {
        expect(screen.queryByTestId("admin-popover")).not.toBeInTheDocument();
      });
    });
  });

  describe("with admin user", () => {
    beforeEach(() => {
      setupAuthMocks({ isGuest: false, isAdmin: true });
      render(<Forum />);
    });

    it("should show admin popover for admin users", async () => {
      await waitFor(
        () => {
          expect(screen.getByTestId("admin-popover")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });
});
