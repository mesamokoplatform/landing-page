import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { VideoLoop } from "./VideoLoop";

describe("VideoLoop", () => {
  it("renders a silently-autoplaying looping video", () => {
    const { container } = render(<VideoLoop src="/video/hero.mp4" />);
    const v = container.querySelector("video")!;
    expect(v).toBeTruthy();
    expect(v).toHaveAttribute("src", "/video/hero.mp4");
    expect(v.muted).toBe(true);
    expect(v.loop).toBe(true);
    expect(v.autoplay).toBe(true);
    expect(v.getAttribute("playsinline")).not.toBeNull();
  });

  it("plays at normal speed by default (no slowMo)", () => {
    const { container } = render(<VideoLoop src="/video/hero.mp4" />);
    const v = container.querySelector("video")!;
    expect(v.playbackRate).toBe(1);
  });

  it("runs in slow-motion by default and returns to normal on hover", () => {
    // The speed effect tracks the nearest `.group` ancestor (the card),
    // matching the CSS colour reveal.
    const { container } = render(
      <div className="group">
        <VideoLoop src="/video/clip.mp4" slowMo />
      </div>,
    );
    const card = container.querySelector(".group")!;
    const v = container.querySelector("video")!;

    expect(v.playbackRate).toBe(0.5);
    fireEvent.mouseEnter(card);
    expect(v.playbackRate).toBe(1);
    fireEvent.mouseLeave(card);
    expect(v.playbackRate).toBe(0.5);
  });
});
