import Forum from "./forum";
import { getByTestId, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: "/forum" }),
}));

describe("Forum", () => {
  beforeEach(() => {
    render(<Forum />);
  });

  it("should render navbar", async () => {
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

  it("should make a correct request when like button is clicked", async () => {
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
});
