import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/auth/authSlice";
import BlogForm from ".";
import userEvent from "@testing-library/user-event";

describe("BlogForm component", () => {
  const mockSetIsAddBlogFormOpen = vi.fn();
  const mockOnSubmit = vi.fn();
  afterEach(() => {
    vi.clearAllMocks();
  });

  const initialBlogDetails = {
    title: "Test Blog",
    tags: ["tag1", "tag2"],
    bannerImage: "test-image.jpg",
    body: "Lorem ipsum dolor sit amet",
  };

  const mockStore = (initialState) =>
    configureStore({
      reducer: {
        auth: authSlice,
      },
      preloadedState: initialState,
    });

  const initialState = {};

  const store = mockStore(initialState);

  const user = userEvent.setup();

  it("renders form with initial values", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogForm
            setIsAddBlogFormOpen={mockSetIsAddBlogFormOpen}
            blogDetails={initialBlogDetails}
            onSubmit={mockOnSubmit}
          />
        </BrowserRouter>
      </Provider>
    );

    const titleElement = screen.getByLabelText("Title");
    expect(titleElement).toHaveValue("Test Blog");

    const bannerImageElement = screen.getByLabelText("Banner Image");
    expect(bannerImageElement).toBeInTheDocument();

    const bannerImage = screen.getByAltText("banner-image");
    expect(bannerImage).toHaveAttribute("src", "test-image.jpg");

    const bodyElement = screen.getByLabelText("Blog Body");
    expect(bodyElement).toBeInTheDocument();

    expect(bodyElement).toHaveValue("Lorem ipsum dolor sit amet");
  });

  it("validates form fields", async () => {
    const initialBlogDetails = {
      title: "",
      tags: [],
      bannerImage: "",
      body: "",
    };
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <BlogForm
            setIsAddBlogFormOpen={mockSetIsAddBlogFormOpen}
            blogDetails={initialBlogDetails}
            onSubmit={mockOnSubmit}
          />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      const requiredElement = screen.getAllByText(/required/i);
      expect(requiredElement).toBeTruthy();
    });
  });

  it("submits form with correct values", async () => {
    const initialState = {};
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <BlogForm
            setIsAddBlogFormOpen={mockSetIsAddBlogFormOpen}
            blogDetails={initialBlogDetails}
            onSubmit={mockOnSubmit}
          />
        </BrowserRouter>
      </Provider>
    );
    const titleElement = screen.getByLabelText(/Title/i);
    await user.clear(titleElement);
    await user.type(titleElement, "Test Blog");
    const bodyElement = screen.getByLabelText(/Body/i);
    await user.clear(bodyElement);
    await user.type(bodyElement, "Lorem ipsum");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled({});
    });
  });
});
