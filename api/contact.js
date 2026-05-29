// Vercel Serverless Function — Contact Form Submission
// POST /api/contact
// Sends form data to hello@enreallab.com.hk via SMTP

import nodemailer from 'nodemailer'

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

    // Honeypot spam protection
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

    // SMTP Configuration
    // For Gmail: Use App Password (not your regular password)
    // Generate at: https://myaccount.google.com/apppasswords
    const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587')
    const SMTP_USER = process.env.SMTP_USER
    const SMTP_PASS = process.env.SMTP_PASS

    if (!SMTP_USER || !SMTP_PASS) {
      console.error('SMTP credentials not configured')
      return res.status(500).json({
        error: 'Email service not configured. Please contact us directly at hello@enreallab.com.hk',
      })
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    // Verify connection
    await transporter.verify()

    // Build email content
    const subject = `New Consultation Request from ${fullName}`
    const htmlContent = `
      <h2>New Consultation Request</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${companyName || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Website:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${website || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Interested Employees:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${employeeList}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td></tr>
      </table>
    `

    const textContent = `
New Consultation Request

Name: ${fullName}
Email: ${email}
Company: ${companyName || 'N/A'}
Phone: ${phone || 'N/A'}
Website: ${website || 'N/A'}
Interested Employees: ${employeeList}

Message:
${message}
    `.trim()

    // Send email
    const info = await transporter.sendMail({
      from: `"Enreal AI Website" <${SMTP_USER}>`,
      to: 'hello@enreallab.com.hk',
      replyTo: email,
      subject: subject,
      text: textContent,
      html: htmlContent,
    })

    console.log('Email sent:', info.messageId)

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      messageId: info.messageId,
    })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({
      error: 'Failed to send email. Please try again later or contact us directly at hello@enreallab.com.hk',
      debug: err.message,
    })
  }
}
