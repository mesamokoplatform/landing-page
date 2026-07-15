# Waitlist acknowledgement emails

These are the "thank you" emails sent to someone after they submit a waitlist form
(the Figma **EMAIL ACKN.** design). They contain a **CTA linking to the app roll‑out
prototype** — that link is a placeholder here.

- [`restaurant.html`](restaurant.html) — sent to restaurant / partner sign‑ups
- [`diner.html`](diner.html) — sent to diner waitlist sign‑ups

## ⚠️ This is NOT wired up in the site code

The site submits forms via **Web3Forms** (see the main README). The acknowledgement
email is Web3Forms' **autoresponder**, configured in the Web3Forms dashboard — not in
this repository. Nothing in `components/` sends this email.

## How to enable it

1. In the [Web3Forms dashboard](https://web3forms.com), open each access key
   (restaurant + diner) → **Autoresponder** (a Pro feature) and enable it.
2. Set a **Subject** (e.g. `Welcome to the Mesa Moko waitlist`).
3. Paste the matching HTML file's contents as the autoresponder body.
4. **Replace the placeholder** `{{PROTOTYPE_URL}}` with the real app roll‑out
   prototype link. It appears on the "View the product demo" button (search the file
   for `{{PROTOTYPE_URL}}`).
5. Send yourself a test submission to confirm it renders in Gmail / Apple Mail / Outlook.

## Notes

- The HTML is table‑based with inline styles for email‑client compatibility.
- Web fonts don't load reliably in email, so these fall back to `Georgia, serif`
  (for the Cormorant feel) and a system sans for the uppercase labels.
- Social links point at the same handles as the site footer; update if those change.
