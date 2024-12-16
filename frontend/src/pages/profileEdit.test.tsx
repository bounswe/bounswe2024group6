import { render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import EditProfile from "./profile-update";

// Mock modules
vi.mock("axios", () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: {} }),
    get: vi.fn().mockResolvedValue({
      data: {
        username: "testuser",
        level: "A1",
        bio: "Initial bio",
        image: "test-image.jpg"
      }
    }),
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

  it("renders form elements after loading", async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByTestId("bio-textarea")).toBeInTheDocument();
      expect(screen.getByTestId("level-select-button")).toBeInTheDocument();
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });
  });

  it("handles input changes", async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByTestId("bio-textarea")).toBeInTheDocument();
    });

    const bioInput = screen.getByTestId("bio-textarea");
    await userEvent.type(bioInput, "Test Bio");

    expect(bioInput).toHaveValue("Test Bio");
  });

  it("handles form submission", async () => {
    renderComponent();
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByTestId("bio-textarea")).toBeInTheDocument();
    });

    const bioInput = screen.getByTestId("bio-textarea");
    await user.clear(bioInput);
    await user.type(bioInput, "Test Bio");

    const levelSelect = screen.getByTestId("level-select-button");
    await user.click(levelSelect);

    await waitFor(() => {
      expect(screen.getByTestId("level-option-A2")).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("level-option-A2"));

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
