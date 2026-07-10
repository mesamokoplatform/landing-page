import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProblemSection } from "./ProblemSection";

describe("ProblemSection", () => {
  it("renders the heading and body", () => {
    render(<ProblemSection />);
    expect(screen.getByRole("heading", { name: /menus have not kept up/i })).toBeInTheDocument();
    expect(screen.getByText(/transforms your static/i)).toBeInTheDocument();
  });
});
