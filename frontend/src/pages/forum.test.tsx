import Forum from "./forum";
import { render } from "@testing-library/react";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: "/forum" }),
}));

describe("Forum", () => {
  it("should render without crashing", () => {
    render(<Forum />);
  });
});
