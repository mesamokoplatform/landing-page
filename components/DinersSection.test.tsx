import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DinersSection } from "./DinersSection";

describe("DinersSection", () => {
  it("renders 4 image cards, heading, and the waitlist form", () => {
    const { container } = render(<DinersSection />);
    expect(container.querySelector("#diners")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Mesa Moko For Diners" })).toBeInTheDocument();
    expect(container.querySelectorAll("img")).toHaveLength(4);
    expect(screen.getByRole("button", { name: /join the waitlist/i })).toBeInTheDocument();
  });
});
