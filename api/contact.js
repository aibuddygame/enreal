// Vercel Serverless Function — Contact Form Submission
// POST /api/contact
// Sends form data to hello@enreallab.com.hk via Resend REST API

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

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return res.status(500).json({
        error: 'Email service is temporarily unavailable. Please try again later or contact us directly at hello@enreallab.com.hk',
      })
    }

    const employeeList = Array.isArray(interestedEmployees)
      ? interestedEmployees.join(', ')
      : interestedEmployees || 'None selected'

    // Build HTML email body
    const htmlBody = `
      <h2>New AI Workforce Consultation Request</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(companyName || 'N/A')}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(phone || 'N/A')}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Website:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(website || 'N/A')}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Interested AI Employees:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(employeeList)}</td></tr>
      </table>
      <h3 style="margin-top: 24px;">Message:</h3>
      <p style="white-space: pre-wrap; background: #f8fafc; padding: 16px; border-radius: 8px;">${escapeHtml(message)}</p>
      <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;">
      <p style="color: #888; font-size: 12px;">Submitted from enreallab.com.hk contact form</p>
    `

    // Build plain text fallback
    const textBody = `
New AI Workforce Consultation Request

Full Name: ${fullName}
Company: ${companyName || 'N/A'}
Email: ${email}
Phone: ${phone || 'N/A'}
Website: ${website || 'N/A'}
Interested AI Employees: ${employeeList}

Message:
${message}

---
Submitted from enreallab.com.hk contact form
    `.trim()

    // Send via Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Enreal Lab <noreply@enreallab.com.hk>',
        to: ['hello@enreallab.com.hk'],
        reply_to: email,
        subject: 'New AI Workforce Consultation Request',
        html: htmlBody,
        text: textBody,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Resend API error:', response.status, errorData)
      return res.status(500).json({
        error: 'Failed to send email. Please try again later or contact us directly at hello@enreallab.com.hk',
      })
    }

    const result = await response.json()
    console.log('Email sent via Resend:', result.id)

    return res.status(200).json({ success: true, message: 'Form submitted successfully' })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({
      error: 'Something went wrong. Please try again later or contact us directly at hello@enreallab.com.hk',
    })
  }
}

function escapeHtml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
