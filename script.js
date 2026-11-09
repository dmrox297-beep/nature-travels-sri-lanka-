// Nature Travels Sri Lanka - lightweight interactions and GTM dataLayer events.
// Replace the placeholder with the business WhatsApp number in international format,
// digits only (example: 94771234567). Never include +, spaces or leading 0.
const WHATSAPP_NUMBER = "94XXXXXXXXX";

window.dataLayer = window.dataLayer || [];
function trackEvent(eventName, parameters = {}) {
  window.dataLayer.push({
    event: eventName,
    ...parameters
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

// Track key CTA clicks as interaction events, not confirmed bookings.
document.querySelectorAll("[data-track]").forEach(element => {
  element.addEventListener("click", () => {
    trackEvent("travel_cta_click", {
      cta_name: element.dataset.track,
      link_text: (element.textContent || "").trim().slice(0, 80)
    });
  });
});

function openWhatsApp(message, source) {
  trackEvent("whatsapp_inquiry_start", { inquiry_source: source });
  const numberIsConfigured = /^94\d{9}$/.test(WHATSAPP_NUMBER);
  if (!numberIsConfigured) {
    alert("Website setup needed: add your WhatsApp number in script.js before using this button.");
    return;
  }
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener");
}

document.getElementById("floating-whatsapp").addEventListener("click", event => {
  event.preventDefault();
  openWhatsApp("Hello Nature Travels Sri Lanka! I would like to ask about your travel services.", "floating_whatsapp");
});

document.getElementById("inquiry-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const interest = String(data.get("interest") || "").trim();
  const message = String(data.get("message") || "").trim();

  // This is an inquiry hand-off to WhatsApp, not a confirmed booking.
  trackEvent("generate_lead", {
    lead_method: "whatsapp_form",
    travel_interest: interest
  });

  const whatsappMessage =
    "Hello Nature Travels Sri Lanka!\n\n" +
    "Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Interested in: " + interest + "\n" +
    "Trip details: " + (message || "Not provided");

  document.getElementById("form-status").textContent =
    "Opening WhatsApp. Please send the pre-filled message to complete your inquiry.";
  openWhatsApp(whatsappMessage, "inquiry_form");
});

// Phone and email click tracking can be added when real contact details are inserted.
// Booking confirmation should be tracked only after a genuine booking confirmation,
// ideally from a booking backend or CRM, not from a button click.
