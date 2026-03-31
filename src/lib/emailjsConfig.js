export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'demo_service';
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'demo_key';
export const EMAILJS_TEMPLATE_BUSINESS = import.meta.env.VITE_EMAILJS_TEMPLATE_BUSINESS || 'demo_template';
export const EMAILJS_TEMPLATE_INDIVIDUAL = import.meta.env.VITE_EMAILJS_TEMPLATE_INDIVIDUAL || 'demo_template';

// Production safety check - only throw in production build
if (import.meta.env.PROD && (
    !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
    !import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
    !import.meta.env.VITE_EMAILJS_TEMPLATE_BUSINESS ||
    !import.meta.env.VITE_EMAILJS_TEMPLATE_INDIVIDUAL
)) {
    console.warn("EmailJS environment variables missing. Contact form will not work.");
}