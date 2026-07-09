import { describe, it, expect } from "vitest";
import { hero, restaurants, diners, nav, social } from "./content";

describe("content", () => {
  it("has verbatim hero copy", () => {
    expect(hero.title).toBe("Welcome to the Future of Smart, Visual Dining");
    expect(hero.lines).toEqual([
      "Premium digital menus.",
      "Data-rich insights.",
      "Elevated guest experiences.",
    ]);
  });
  it("has 4 restaurant + 4 diner cards", () => {
    expect(restaurants.cards).toHaveLength(4);
    expect(diners.cards).toHaveLength(4);
  });
  it("keeps exact restaurant card titles", () => {
    expect(restaurants.cards.map((c) => c.title)).toEqual([
      "Drive more orders and increase revenue",
      "Help diners book with confidence and decide faster",
      "Make instant updates with no reprints or QR codes",
      "Elevate your brand and stand out from the crowd",
    ]);
  });
  it("has nav + social links", () => {
    expect(nav.map((n) => n.href)).toEqual(["#restaurants", "#diners"]);
    expect(social.map((s) => s.label)).toEqual(["Instagram", "Tik Tok"]);
  });
});
