import { render, fireEvent, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import ProfileUpdate from "./profile-update";
import { avatar, NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import EditProfile from "./profile-update";

// Mock modules
vi.mock("axios", () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: {} }),
    get: vi.fn().mockResolvedValue({ data: {} }),
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../components/auth/utils", () => ({
  AuthActions: () => ({
    getToken: () => "mock-token",
  }),
}));

describe("EditProfile", () => {
  const renderComponent = () => {
    return render(
      <NextUIProvider>
        <BrowserRouter>
          <EditProfile />
        </BrowserRouter>
      </NextUIProvider>
    );
  };

  beforeEach(() => {
    renderComponent();
  });

  it("renders form elements", () => {
    expect(screen.getByTestId("bio-input")).toBeInTheDocument();
    expect(screen.getByTestId("level-select")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const bioInput = screen.getByTestId("bio-input");

    fireEvent.change(bioInput, { target: { value: "Test Bio" } });

    expect(bioInput).toHaveValue("Test Bio");
  });


  it("handles form submission", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByTestId("bio-input"), "Test Bio");

    await user.click(screen.getByTestId("level-select"));
    const levelOption = await screen.findByTestId("level-option-A2");
    await user.click(levelOption);

    const submitButton = screen.getByTestId("submit-button");
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          username: "",
          bio: "Test Bio",
          level: "A2",
          avatar: "",
        }),
        expect.any(Object)
      );
    });
  });
});
