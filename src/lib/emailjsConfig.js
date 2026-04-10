// EmailJS Configuration
// Hardcoded values - replace with your actual EmailJS credentials

// EmailJS Configuration - Updated with actual credentials
export const EMAILJS_SERVICE_ID = 'service_ytwl7he';  // Your EmailJS Service ID
export const EMAILJS_PUBLIC_KEY = 'swTDRfjoWHmoRS3cm';  // Your EmailJS Public Key
export const EMAILJS_TEMPLATE_ENROLLMENT = 'template_566oabb';  // Your enrollment template ID
export const EMAILJS_TEMPLATE_BUSINESS = 'template_566oabb';  // Using same template for now
export const EMAILJS_TEMPLATE_INDIVIDUAL = 'template_566oabb';  // Using same template for now

// Production safety check - only throw in production build
if (import.meta.env.PROD && (
    !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
    !import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
    !import.meta.env.VITE_EMAILJS_TEMPLATE_BUSINESS ||
    !import.meta.env.VITE_EMAILJS_TEMPLATE_INDIVIDUAL ||
    !import.meta.env.VITE_EMAILJS_TEMPLATE_ENROLLMENT
)) {
    console.warn("EmailJS environment variables missing. Contact form will not work.");
}