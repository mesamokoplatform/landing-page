import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArrowButton } from "./ArrowButton";

describe("ArrowButton", () => {
  it("renders a link with an arrow when href is given", () => {
    render(<ArrowButton href="#restaurants">For Restaurants</ArrowButton>);
    const link = screen.getByRole("link", { name: /for restaurants/i });
    expect(link).toHaveAttribute("href", "#restaurants");
    // The arrow is a decorative inline SVG (replaced the old "→" glyph)
    expect(link.querySelector("svg")).toBeTruthy();
  });
  it("renders a button when no href", () => {
    render(<ArrowButton type="submit">Join</ArrowButton>);
    expect(screen.getByRole("button", { name: /join/i })).toHaveAttribute("type", "submit");
  });
});
