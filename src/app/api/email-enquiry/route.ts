import { NextRequest, NextResponse } from 'next/server'
import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { serverError500 } from '@/app/lib/apiErrors/serverError'
import { htmlEmailString } from './htmlEmailString'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name } = data || {}

    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing SENDGRID_API_KEY' },
        { status: 500 }
      )
    }

    sgMail.setApiKey(apiKey)

    const msg: MailDataRequired = {
      to: process.env.CONTACT_TO || 'maxvoltselectricalservices@gmail.com',
      from: process.env.EMAIL_FROM || 'maxvoltsenquires@gmail.com',
      subject: `Max Volts Website Enquiry from ${name ?? 'Unknown'}`,
      text: 'New enquiry',
      html: htmlEmailString(data),
    }

    await sgMail.send(msg)
    return NextResponse.json({ message: 'Email sent' }, { status: 200 })
  } catch (error) {
    console.error('SendGrid error:', error)
    return serverError500
  }
}
