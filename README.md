# Nature Travels Sri Lanka — Website Project

A responsive static website built with HTML, CSS and JavaScript. Suitable for deployment on Cloudflare Pages or another static hosting provider.

## Files

- `index.html` — website content, SEO metadata, Open Graph tags and TravelAgency JSON-LD.
- `styles.css` — responsive design and styling.
- `script.js` — mobile navigation, WhatsApp inquiry form and dataLayer event hooks.
- `robots.txt` — crawler instructions and sitemap location.
- `sitemap.xml` — sitemap for the main page.

## IMPORTANT: Before publishing

1. Open `script.js` and replace `94XXXXXXXXX` with your WhatsApp number in international digits-only format. Example format: `9477XXXXXXX`.
2. In `index.html`, replace every `https://YOUR-DOMAIN.com/` with your final domain.
3. In `robots.txt` and `sitemap.xml`, replace `YOUR-DOMAIN.com` with your final domain.
4. Update the canonical URL, Open Graph URL and JSON-LD URL/image if you change the domain or main social image.
5. Replace the demo Unsplash images with photos you own or have permission to use. Update each image's `alt` text to describe the actual image.
6. Review every business statement and contact detail before publishing. Do not add unverified claims, prices, testimonials or credentials.

## Deploy on Cloudflare Pages

1. Sign in to Cloudflare.
2. Go to **Workers & Pages** → **Create** → **Pages**.
3. Choose **Connect to Git** and authorize your GitHub account.
4. Select the repository containing these files.
5. Framework preset: **None** (or **Static HTML** if shown).
6. Build command: leave blank.
7. Build output directory: `/` or `.` as requested by the Cloudflare setup screen.
8. Deploy. Later GitHub commits will trigger new deployments.

## Google Analytics 4 and Google Ads tracking

This project includes dataLayer event hooks, but tracking is NOT active until you configure Google Tag Manager.

1. Create a Google Tag Manager web container and copy its ID (`GTM-XXXXXXX`).
2. In `script.js`, replace `GTM-XXXXXXX` with your real GTM container ID.
3. Publish a GTM container version containing:
   - Google tag / GA4 configuration with your Measurement ID (`G-XXXXXXXXXX`).
   - Conversion Linker tag, firing on all pages.
   - GA4 event tag for `generate_lead`.
   - Optional GA4 event tag for `whatsapp_inquiry_start`.
   - Google Ads Conversion Tracking tag for `generate_lead`, using the Conversion ID and Conversion Label from Google Ads.
4. In GTM, create Custom Event triggers with exact event names:
   - `generate_lead`
   - `whatsapp_inquiry_start`
   - `travel_cta_click`
5. Test with GTM Preview / Tag Assistant and GA4 DebugView. Publish only after verifying the tags fire as expected.

**Important measurement note:** `generate_lead` records a user starting a WhatsApp inquiry. It does not prove the WhatsApp message was sent, a booking was confirmed, or a payment was received. For confirmed bookings and revenue, connect a booking system or CRM that can send a separate confirmed-booking event.

## SEO launch checklist

- Use a final domain and update all `YOUR-DOMAIN.com` placeholders.
- Verify the site in Google Search Console.
- Submit `https://YOUR-DOMAIN.com/sitemap.xml`.
- Test the live URL with Google Search Console URL Inspection.
- Add accurate business contact details and a real business address only if appropriate.
- Use descriptive page copy that matches the tours and services actually offered.
- Use original, compressed images and meaningful alt text.
- Add individual pages for important destinations/tour packages as real content becomes available; do not create thin or duplicate keyword pages.
- SEO does not guarantee rankings. Google needs time to crawl and evaluate the site.

## Form behaviour

The inquiry form opens WhatsApp with a pre-filled message. It does not store enquiries in a website database or send an email. The visitor must press **Send** in WhatsApp.
