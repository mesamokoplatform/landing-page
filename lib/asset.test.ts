import { describe, it, expect, afterEach, vi } from "vitest";
import { asset } from "./asset";

describe("asset", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("prefixes a path with NEXT_PUBLIC_BASE_PATH when set", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/landing-page");
    expect(asset("/video/hero.mp4")).toBe("/landing-page/video/hero.mp4");
    expect(asset("/images/diner-1.png")).toBe("/landing-page/images/diner-1.png");
  });

  it("leaves the path unchanged when the base path is empty/unset", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
    expect(asset("/video/hero.mp4")).toBe("/video/hero.mp4");
  });
});
