import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RestaurantsSection } from "./RestaurantsSection";

describe("RestaurantsSection", () => {
  it("renders 4 cards, the heading, and a form", () => {
    const { container } = render(<RestaurantsSection />);
    expect(container.querySelector("#restaurants")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Mesa Moko for Restaurants" })).toBeInTheDocument();
    expect(container.querySelectorAll("video")).toHaveLength(4);
    expect(screen.getByRole("button", { name: /become a partner restaurant/i })).toBeInTheDocument();
  });
});
