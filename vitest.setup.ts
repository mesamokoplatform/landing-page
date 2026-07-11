import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/font/google's real implementation is injected by Next's SWC/webpack
// build pipeline (it fetches + self-hosts the font at build time). Under
// Vitest's Vite transform that pipeline never runs, so the package's own
// entry point is an empty stub. Mirror Next's own official Jest mock
// (next/font/google/jest): each loader is argument-oblivious and returns a
// fixed, plausible shape. Callers must verify behavior via the *arguments*
// the loader was called with (vi.mocked(Cormorant_Garamond).mock.calls),
// not via the mocked return value's `.variable` string — that string bears
// no resemblance to the real hashed class name Next generates at build time.
vi.mock("next/font/google", () => {
  const makeFontLoaderMock = () =>
    vi.fn(() => ({
      className: "mock-classname",
      variable: "mock-variable",
      style: { fontFamily: "mock" },
    }));
  return {
    Cormorant_Garamond: makeFontLoaderMock(),
    Syne: makeFontLoaderMock(),
  };
});

// jsdom does not implement HTMLMediaElement.play()/pause() — it logs a
// "Not implemented" error and returns undefined. VideoLoop calls play()
// imperatively to kick off autoplay, so stub these as no-ops that return a
// resolved promise, keeping test output pristine.
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();

// jsdom does not implement matchMedia. FeatureCard queries "(hover: hover)" to
// decide whether to keep desktop hover behavior or reveal on scroll (touch).
// Report no match (matches:false) so the effect takes the touch branch and
// wires up the (mocked, non-firing) IntersectionObserver harmlessly.
window.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock IntersectionObserver for components that use it. observe() intentionally
// never fires the callback, so Reveal stays in its pre-reveal (hidden) state
// under test; RTL DOM queries still see the mounted children regardless.
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;
