import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Home page", () => {
  it("renders hero + both section anchors", () => {
    const { container } = render(<Page />);
    expect(screen.getByRole("heading", { name: /welcome to the future/i })).toBeInTheDocument();
    expect(container.querySelector("#restaurants")).toBeTruthy();
    expect(container.querySelector("#diners")).toBeTruthy();
  });
});
