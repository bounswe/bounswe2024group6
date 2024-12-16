import { render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import QuizReview from "./quiz-review";

vi.mock("axios", () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        quiz_title: "Test Quiz",
        question_count: 2,
        questions: [
          {
            question: "Test Question 1",
            choices: ["A", "B", "C", "D"],
            correct_choice: "A",
            previous_answer: "B"
          }
        ]
      }
    })
  }
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ quizResultID: "1" }),
    useNavigate: () => vi.fn()
  };
});

vi.mock("../components/auth/utils", () => ({
  AuthActions: () => ({
    getToken: () => "mock-token"
  })
}));

// Mock Navbar
vi.mock("../components/common/navbar.tsx", () => ({
  default: () => <div data-testid="navbar" />
}));

// Mock QuestionCard
vi.mock("../components/quiz/question-card.tsx", () => ({
  default: ({ question, option_a, option_b, option_c, option_d }) => (
    <div data-testid="question-card">
      <h2 data-testid="question-text">{question}</h2>
      <div data-testid="choices">
        <div>{option_a}</div>
        <div>{option_b}</div>
        <div>{option_c}</div>
        <div>{option_d}</div>
      </div>
    </div>
  ),
}));

describe("QuizReview", () => {
  const renderComponent = () => {
    return render(
      <NextUIProvider>
        <BrowserRouter>
          <QuizReview />
        </BrowserRouter>
      </NextUIProvider>
    );
  };

  it("displays quiz title after loading", async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText("Test Quiz")).toBeInTheDocument();
    });
  });

  it("shows question content", async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByTestId("question-text")).toHaveTextContent("Test Question 1");
      expect(screen.getByTestId("choices")).toBeInTheDocument();
    });
  });

  it("displays navigation buttons", async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Previous/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
    });
  });
});
