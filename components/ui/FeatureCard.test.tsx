import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureCard } from "./FeatureCard";

const card = { title: "Drive more orders", body: "Boosts sales", media: "/x.mp4" };

describe("FeatureCard", () => {
  it("renders a video for the video variant", () => {
    const { container } = render(<FeatureCard card={{ ...card, media: "/video/restaurant-1.mp4" }} variant="video" />);
    expect(container.querySelector("video")).toBeTruthy();
    expect(screen.getByText("Drive more orders")).toBeInTheDocument();
    expect(screen.getByText("Boosts sales")).toBeInTheDocument();
  });
  it("renders an img for the image variant", () => {
    const { container } = render(<FeatureCard card={{ ...card, media: "/images/diner-1.jpg" }} variant="image" />);
    expect(container.querySelector("img")).toBeTruthy();
    expect(container.querySelector("video")).toBeNull();
  });
});
