import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("shows the headline and three sub-lines over a video", () => {
    const { container } = render(<Hero />);
    expect(screen.getByRole("heading", { name: /welcome to the future of smart, visual dining/i })).toBeInTheDocument();
    expect(screen.getByText("Premium digital menus.")).toBeInTheDocument();
    expect(screen.getByText("Elevated guest experiences.")).toBeInTheDocument();
    expect(container.querySelector("video")).toBeTruthy();
  });
});
