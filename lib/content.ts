export type Card = { title: string; body: string; media: string };

export const nav = [
  { label: "For Restaurants", href: "#restaurants" },
  { label: "For Diners", href: "#diners" },
];

export const hero = {
  title: "Welcome To The Future Of Smart, Visual Dining.",
  lines: ["Premium digital menus.", "Data-rich insights.", "Elevated guest experiences."],
  media: "/video/hero.mp4",
};

export const problem = {
  heading:
    "Menus Have Not Kept Up With The Visual, Personalised Expectations Of Today's Diners.",
  body: "Mesa Moko transforms your static menu into a live, curated experience – tailored to each guest.",
  media: "/video/mockup.mp4",
};

export const restaurants = {
  eyebrow: "Elevate your product",
  heading: "Mesa Moko For Restaurants",
  intro:
    "Mesa Moko empowers visionary restaurants to deliver beautiful, immersive menus and provide visual storytelling to diners before the first bite.",
  cta: "Become a Partner Restaurant",
  cards: [
    {
      title: "Know What Your Menu\nIs Worth:",
      body: "Understand how your dishes perform against the market and ensure every plate is priced to reflect its true value. Stunning visuals turn every dish into a discovery moment, increasing diner engagement and spend.",
      media: "/video/restaurant-1.mp4",
    },
    {
      title: "Build deep, lasting relationships\nand attract new ones:",
      body: "Keep your most interested diners up to date with menu changes and the inspiration behind your dishes. Every new dish you upload is a new opportunity to be discovered by diners who have never heard of you.",
      media: "/video/restaurant-2.mp4",
    },
    {
      title: "Make instant updates with\nno reprints or QR codes:",
      body: "Real-time digital menus keep things effortless and current — accessible to every diner, wherever they are.",
      media: "/video/restaurant-3.mp4",
    },
    {
      title: "Your silent marketing engine,\nworking 24/7 — elevating\nyour brand:",
      body: "Share your story and creativity with browsing diners most likely to love it — automatically converting them into customers.",
      media: "/video/restaurant-4.mp4",
    },
  ] as Card[],
};

export const diners = {
  eyebrow: "Elevate your experiences",
  heading: "Mesa Moko For Diners",
  intro: [
    "Mesa Moko is dining, reimagined — an experience built around you.",
    "Browse and discover extraordinary restaurants through the food they make, all in one place.",
  ],
  cards: [
    {
      title: "Order With Confidence And\nSkip The Guesswork:",
      body: "See every dish brought to life through visuals, before deciding where and what to eat.",
      media: "/images/diner-1.png",
    },
    {
      title: "Every Menu, Made For You:",
      body: "The more you use Mesa Moko, the better it knows your taste — automatically identifying the one dish on every menu you open that most closely aligns with your taste profile, while flagging those that conflict with your allergens or dietary requirements.",
      media: "/images/diner-2.png",
    },
    {
      title: "Discover Restaurants Through\nThe Food, Not The Name:",
      body: "Fall in love with a dish first — then discover which restaurant made it. Learn how they made it, what inspired it and which other dishes on their menu complement it perfectly.",
      media: "/images/diner-3.png",
    },
    {
      title: "Build Your Personal Food\nDiary",
      body: "Track what you've tried, share your food moments and save what you want to taste next.",
      media: "/images/diner-4.png",
    },
  ] as Card[],
};

export const social = [
  { label: "Email", href: "mailto:contact@mesamoko.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/mesa-moko" },
  { label: "Instagram", href: "https://www.instagram.com/mesamoko" },
  { label: "Tik Tok", href: "https://www.tiktok.com/@mesamoko" },
];
