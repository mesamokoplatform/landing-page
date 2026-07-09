import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { LoadingSplash } from "./LoadingSplash";

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove("splash-seen");
  try {
    sessionStorage.clear();
  } catch {
    /* ignore */
  }
});

describe("LoadingSplash", () => {
  it("shows the monogram overlay on first visit", () => {
    const { container } = render(<LoadingSplash />);
    const overlay = container.querySelector("#mm-splash");
    expect(overlay).toBeTruthy();
    const img = overlay!.querySelector("img");
    expect(img?.getAttribute("src")).toContain("monogram");
  });

  it("keeps the #mm-splash id on repeat visits so CSS (.splash-seen) hides it without a flash", () => {
    // The inline head script adds `splash-seen` before paint; the component
    // bails out of its animation and lets the CSS rule hide the overlay.
    document.documentElement.classList.add("splash-seen");
    const { container } = render(<LoadingSplash />);
    const overlay = container.querySelector("#mm-splash");
    expect(overlay).toBeTruthy();
    // It must not have JS-applied hiding classes — hiding is CSS's job here.
    expect(overlay?.className).not.toContain("opacity-0");
  });
});
