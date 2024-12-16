import { render, fireEvent, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import ComposePostForm from "../components/post/compose-post-form";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";

// Mock modules
vi.mock("axios", () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: {} }),
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

describe("ComposePostForm", () => {
  const renderComponent = () => {
    return render(
      <NextUIProvider>
        <BrowserRouter>
          <ComposePostForm />
        </BrowserRouter>
      </NextUIProvider>
    );
  };

  beforeEach(() => {
    renderComponent();
  });

  it("renders form elements", () => {
    expect(screen.getByTestId("post-title-input")).toBeInTheDocument();
    expect(screen.getByTestId("post-content-input")).toBeInTheDocument();
    expect(screen.getByTestId("difficulty-select")).toBeInTheDocument();
    expect(screen.getByTestId("submit-post-button")).toBeInTheDocument();
    expect(screen.getByTestId("add-tag-button")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const titleInput = screen.getByTestId("post-title-input");
    const contentInput = screen.getByTestId("post-content-input");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });

    expect(titleInput).toHaveValue("Test Title");
    expect(contentInput).toHaveValue("Test Content");
  });

  it("disables submit button when form is invalid", () => {
    const submitButton = screen.getByTestId("submit-post-button");
    expect(submitButton).toBeDisabled();
  });

  it("enables submit button when form is valid", async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByTestId("post-title-input");
    await user.type(titleInput, "Test Title");

    const contentInput = screen.getByTestId("post-content-input");
    await user.type(contentInput, "Test Content");

    await waitFor(() => {
      const submitButton = screen.getByTestId("submit-post-button");
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("handles form submission", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByTestId("post-title-input"), "Test Title");
    await user.type(screen.getByTestId("post-content-input"), "Test Content");

    const submitButton = screen.getByTestId("submit-post-button");
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          title: "Test Title",
          description: "Test Content",
          tags: [],
        }),
        expect.any(Object)
      );
    });
  });

  it("opens and closes tag search modal", async () => {
    const user = userEvent.setup();

    const addTagButton = screen.getByTestId("add-tag-button");
    await user.click(addTagButton);

    await waitFor(() => {
      const tagSearchModal = screen.getByRole("dialog");
      expect(tagSearchModal).toBeInTheDocument();
    });

    // Close modal using Escape key since there's no explicit close button
    await user.keyboard('{Escape}');

    await waitFor(() => {
      const tagSearchModal = screen.queryByRole("dialog");
      expect(tagSearchModal).not.toBeInTheDocument();
    });
  });
});
