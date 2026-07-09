export type Card = { title: string; body: string; media: string };

export const nav = [
  { label: "For Restaurants", href: "#restaurants" },
  { label: "For Diners", href: "#diners" },
];

export const hero = {
  title: "Welcome to the Future of Smart, Visual Dining",
  lines: ["Premium digital menus.", "Data-rich insights.", "Elevated guest experiences."],
};

export const problem = {
  heading: "Menus have not kept up with the visual, personalised expectations of today's diners.",
  body: "Mesa Moko transforms your static menu into a live, curated experience – tailored to each guest.",
  media: "/video/mockup.mp4",
};

export const restaurants = {
  eyebrow: "Elevate your product",
  heading: "Mesa Moko for Restaurants",
  intro:
    "Mesa Moko empowers visionary restaurants to deliver interactive menus and provide visual storytelling to customers before the first bite.",
  cta: "Become a Partner Restaurant",
  cards: [
    { title: "Drive more orders and increase revenue", body: "Professional, stunning visuals of each dish boosts diner engagement and sales", media: "/video/restaurant-1.mp4" },
    { title: "Help diners book with confidence and decide faster", body: "Smart, detailed menus reduce walkaways and indecision", media: "/video/restaurant-2.mp4" },
    { title: "Make instant updates with no reprints or QR codes", body: "Real-time digital menus keep things effortless and current", media: "/video/restaurant-3.mp4" },
    { title: "Elevate your brand and stand out from the crowd", body: "Share your story, creativity and signature dishes with every diner", media: "/video/restaurant-4.mp4" },
  ] as Card[],
};

export const diners = {
  eyebrow: "Elevate your experiences",
  heading: "Mesa Moko for Diners",
  intro: [
    "Mesa Moko is dining, reimagined; an experience built around you.",
    "Browse beautifully curated restaurant menus in one centralised app and make confident, inspired choices.",
  ],
  cards: [
    { title: "Order with confidence and skip the guesswork", body: "See stunning food photography for every dish on the menu before you order", media: "/images/diner-1.png" },
    { title: "Stay safe with personalised filtering", body: "Menus adapt to your allergies and dietary needs automatically", media: "/images/diner-2.png" },
    { title: "Explore dishes you'll genuinely love", body: "See customer favourites and receive personalised recommendations based on your dining history", media: "/images/diner-3.png" },
    { title: "Build your personal food diary", body: "Track what you've tried, share your food moments and save what you want to taste next", media: "/images/diner-4.png" },
  ] as Card[],
};

// hrefs match the live site's placeholder "#" (no real profile URLs published yet);
// point these at real profiles once they exist.
export const social = [
  { label: "Instagram", href: "#" },
  { label: "Tik Tok", href: "#" },
];
