/*
 * Nature Travels Sri Lanka
 * IMPORTANT: Add your real WhatsApp number and GTM container ID below.
 * WhatsApp number format: country code + number, digits only (example format: 9477XXXXXXX).
 */
const SITE_CONFIG = {
  whatsappNumber: "94XXXXXXXXX",
  gtmId: "GTM-XXXXXXX"
};

window.dataLayer = window.dataLayer || [];
function trackEvent(eventName, parameters = {}) {
  window.dataLayer.push({ event: eventName, ...parameters });
}

// Load Google Tag Manager only after a real container ID is configured.
if (/^GTM-[A-Z0-9]+$/.test(SITE_CONFIG.gtmId) && SITE_CONFIG.gtmId !== "GTM-XXXXXXX") {
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
    const f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!=='dataLayer'?'&l='+l:'';
    j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer',SITE_CONFIG.gtmId);
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

document.getElementById("year").textContent = new Date().getFullYear();

function isWhatsAppConfigured() {
  return /^\d{10,15}$/.test(SITE_CONFIG.whatsappNumber);
}
function makeWhatsAppUrl(message) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
const floatingWhatsApp = document.getElementById("whatsapp-float");
if (floatingWhatsApp) {
  if (isWhatsAppConfigured()) {
    floatingWhatsApp.href = makeWhatsAppUrl("Hello Nature Travels Sri Lanka, I would like to ask about planning a trip.");
  } else {
    floatingWhatsApp.addEventListener("click", event => {
      event.preventDefault();
      alert("WhatsApp contact is not configured yet. Please contact the website owner.");
    });
  }
}

document.querySelectorAll(".track-cta").forEach(link => {
  link.addEventListener("click", () => {
    trackEvent("travel_cta_click", {
      cta_name: link.dataset.cta || "unspecified",
      link_url: link.href
    });
  });
});
if (floatingWhatsApp) {
  floatingWhatsApp.addEventListener("click", () => {
    trackEvent("whatsapp_inquiry_start", { cta_name: "floating_whatsapp" });
  });
}

const inquiryForm = document.getElementById("inquiry-form");
const formError = document.getElementById("form-error");
if (inquiryForm) {
  inquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    formError.hidden = true;

    if (!isWhatsAppConfigured()) {
      formError.textContent = "The WhatsApp number has not been configured yet. Please update SITE_CONFIG in script.js.";
      formError.hidden = false;
      return;
    }

    const formData = new FormData(inquiryForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const travelDate = String(formData.get("travel-date") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !message) return;

    const whatsappMessage = [
      "Hello Nature Travels Sri Lanka, I would like to enquire about a trip.",
      `Name: ${name}`,
      email ? `Email: ${email}` : "",
      travelDate ? `Travel date: ${travelDate}` : "",
      `Trip details: ${message}`
    ].filter(Boolean).join("\n");

    // This measures a WhatsApp handoff/inquiry, NOT a confirmed booking or payment.
    trackEvent("generate_lead", {
      lead_method: "whatsapp",
      form_name: "travel_inquiry",
      travel_date_provided: Boolean(travelDate)
    });
    trackEvent("whatsapp_inquiry_start", { cta_name: "inquiry_form" });
    window.open(makeWhatsAppUrl(whatsappMessage), "_blank", "noopener");
  });
}
