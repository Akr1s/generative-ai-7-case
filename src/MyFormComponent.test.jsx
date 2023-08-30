import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyFormComponent from "./MyFormComponent";

describe("MyFormComponent", () => {
  it("should submit the form with all fields filled correctly", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("should handle very long valid names", () => {
    render(<MyFormComponent />);

    const longName = "a".repeat(200);
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: longName },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("should handle complex valid email addresses", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test.name+alias@example.co.uk" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("should change the gender from male to female and submit", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByLabelText("Female"));
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("should re-submit the form after an initial successful submission", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.click(screen.getByLabelText("Female"));
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("should show an error when Name field is left blank", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("Name must be at least 3 characters.")
    ).toBeInTheDocument();
  });

  it("should show an error for invalid email addresses", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "johnexample.com" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Email must be valid.")).toBeInTheDocument();
  });

  it("should show an error when Agree to Terms is not checked", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("You must agree to the terms.")
    ).toBeInTheDocument();
  });

  it("should show an error when no gender is selected", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("You must select a gender.")).toBeInTheDocument();
  });

  it("should show an error when name is less than 3 characters long", () => {
    render(<MyFormComponent />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Jo" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Agree to Terms/i));
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("Name must be at least 3 characters.")
    ).toBeInTheDocument();
  });
});
