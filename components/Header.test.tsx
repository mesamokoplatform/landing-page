import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("shows the wordmark and both anchor buttons", () => {
    render(<Header />);
    expect(screen.getByAltText("Mesa Moko")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /for restaurants/i })).toHaveAttribute("href", "#restaurants");
    expect(screen.getByRole("link", { name: /for diners/i })).toHaveAttribute("href", "#diners");
  });
});
