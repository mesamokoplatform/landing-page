import { describe, it, expect } from "vitest";
import { hero, restaurants, diners, nav, social } from "./content";

describe("content", () => {
  it("has verbatim hero copy", () => {
    expect(hero.title).toBe("Welcome To The Future Of Smart, Visual Dining.");
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
    // Titles may carry "\n" line-break markers; the copy itself must stay verbatim.
    expect(restaurants.cards.map((c) => c.title.replace(/\n/g, " "))).toEqual([
      "Know What Your Menu Is Worth:",
      "Build deep, lasting relationships and attract new ones:",
      "Make instant updates with no reprints or QR codes:",
      "Your silent marketing engine, working 24/7 — elevating your brand:",
    ]);
  });
  it("has nav + social links", () => {
    expect(nav.map((n) => n.href)).toEqual(["#restaurants", "#diners"]);
    expect(social.map((s) => s.label)).toEqual([
      "Email",
      "LinkedIn",
      "Instagram",
      "Tik Tok",
    ]);
  });
});
