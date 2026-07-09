import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
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
});
