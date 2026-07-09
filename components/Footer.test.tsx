import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows the wordmark and social links", () => {
    render(<Footer />);
    expect(screen.getByText("Mesa Moko")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tik tok/i })).toBeInTheDocument();
  });
});
