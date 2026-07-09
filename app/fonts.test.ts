import { describe, it, expect, vi } from "vitest";
import { Cormorant_Garamond, Syne } from "next/font/google";
import { cormorant, syne } from "./fonts";

describe("fonts", () => {
  it("configures Cormorant Garamond with the expected variable/subsets/weights", () => {
    expect(cormorant).toBeDefined();
    expect(vi.mocked(Cormorant_Garamond)).toHaveBeenCalledWith(
      expect.objectContaining({
        variable: "--font-cormorant",
        subsets: ["latin"],
        weight: ["400", "500", "600", "700"],
      }),
    );
  });

  it("configures Syne with the expected variable/subsets/weights", () => {
    expect(syne).toBeDefined();
    expect(vi.mocked(Syne)).toHaveBeenCalledWith(
      expect.objectContaining({
        variable: "--font-syne",
        subsets: ["latin"],
        weight: ["600", "700"],
      }),
    );
  });
});
