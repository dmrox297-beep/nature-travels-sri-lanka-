# Nature Travels Sri Lanka — Website starter

A responsive, modern travel-agency homepage with a WhatsApp inquiry flow and Google Tag Manager dataLayer event hooks.

## Files
- `index.html` — page structure and metadata
- `styles.css` — responsive visual design
- `script.js` — navigation, inquiry form and tracking events

## Before publishing
1. In `script.js`, replace `94XXXXXXXXX` with the business WhatsApp number in international digits-only format. Example format: `94771234567`.
2. Replace the placeholder email `hello@naturetravels.lk` in `index.html` with the real business email.
3. Replace the demo image URLs with your own licensed travel photographs if available.
4. Add your privacy policy and cookie/consent notice before running analytics or advertising tags for visitors in jurisdictions where consent is required.
5. Test all links and the inquiry form on mobile.

## Free publishing with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a new **public** repository, e.g. `nature-travels-sri-lanka`.
3. Upload `index.html`, `styles.css`, `script.js` and this README to the repository root.
4. Open **Settings → Pages**.
5. Under Build and deployment, select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
6. GitHub will provide a free `https://YOUR-USERNAME.github.io/nature-travels-sri-lanka/` address. A custom domain is optional and costs extra.

## Google Ads tracking setup (recommended: GTM as the single tag manager)
1. Create a Google Tag Manager account/container for the website: https://tagmanager.google.com/
2. Copy the container ID (`GTM-XXXXXXX`).
3. In `index.html`, replace the placeholder ID in both GTM snippets, then uncomment both snippets.
4. Publish the website and verify that the GTM container loads using Google Tag Assistant.
5. In GTM, create a Google tag for your GA4 Measurement ID. Configure the appropriate consent settings before deployment.
6. In GTM, create a Google Ads Conversion Linker tag on all pages.
7. In Google Ads, create conversion actions for:
   - `generate_lead` — the form inquiry hand-off (primary only if you define this as a qualified lead)
   - `whatsapp_inquiry_start` — WhatsApp inquiry started (usually secondary)
   - `travel_cta_click` — CTA interactions (secondary)
8. In GTM, create Custom Event triggers matching those exact event names and connect each to the relevant GA4 Event tag and/or Google Ads Conversion Tracking tag.
9. For Google Ads conversion tags, use the Conversion ID and Conversion Label from the relevant Google Ads conversion action.
10. Test with GTM Preview / Tag Assistant and GA4 DebugView. Confirm each event fires once, and that no conversion is counted as a confirmed booking unless a booking is genuinely confirmed.

## Events pushed to `dataLayer`
- `travel_cta_click` — CTA click; parameter `cta_name`
- `generate_lead` — inquiry form validly submitted and passed to WhatsApp hand-off
- `whatsapp_inquiry_start` — WhatsApp hand-off initiated; parameter `inquiry_source`

Important: this starter does not include a booking engine, server-side tracking, payment processing, CRM, or a real form database. A WhatsApp hand-off is not proof that the visitor sent the message or booked. To track confirmed bookings and booking revenue reliably, connect a booking system/CRM or backend and send a confirmation event from that system. Enhanced Conversions also needs appropriate first-party data handling and consent configuration.

## Images and fonts
The demo uses remote Unsplash image URLs and Google Fonts. They require an internet connection and should be replaced with properly licensed images you own or have permission to use.
