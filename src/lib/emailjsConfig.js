export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
export const EMAILJS_TEMPLATE_BUSINESS = import.meta.env.VITE_EMAILJS_TEMPLATE_BUSINESS;
export const EMAILJS_TEMPLATE_INDIVIDUAL = import.meta.env.VITE_EMAILJS_TEMPLATE_INDIVIDUAL;

// Production safety check
if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_TEMPLATE_BUSINESS ||
    !EMAILJS_TEMPLATE_INDIVIDUAL
) {
    throw new Error("EmailJS environment variables missing.");
}
