// Vercel Serverless Function — Contact Form Submission
// POST /api/contact
// Sends form data to hello@enreallab.com.hk via EmailJS REST API

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}
    const {
      fullName,
      companyName,
      email,
      phone,
      website,
      interestedEmployees,
      message,
      honeypot,
    } = body

    // Honeypot spam protection — silently accept so bots don't know they failed
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Received' })
    }

    // Basic validation
    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    const employeeList = Array.isArray(interestedEmployees)
      ? interestedEmployees.join(', ')
      : interestedEmployees || 'None selected'

    // EmailJS Configuration
    const EMAILJS_SERVICE_ID = 'service_ytwl7he'
    const EMAILJS_TEMPLATE_ID = 'template_566oabb'
    const EMAILJS_PUBLIC_KEY = 'swTDRfjoWHmoRS3cm'
    const EMAILJS_PRIVATE_KEY = 'g_2LYTbELv07KQ-y7O3DB'

    const emailPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: {
        to_email: 'hello@enreallab.com.hk',
        from_name: fullName,
        from_email: email,
        company_name: companyName || 'N/A',
        phone: phone || 'N/A',
        website: website || 'N/A',
        interested_employees: employeeList,
        message: message,
        reply_to: email,
      },
    }

    // Send via EmailJS REST API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('EmailJS error:', text)
      return res.status(500).json({
        error: 'Failed to send email. Please try again later or contact us directly at hello@enreallab.com.hk',
      })
    }

    return res.status(200).json({ success: true, message: 'Form submitted successfully' })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({
      error: 'Something went wrong. Please try again later or contact us directly at hello@enreallab.com.hk',
    })
  }
}
// Force redeploy: 2026-05-30 16:21:35 HKT
