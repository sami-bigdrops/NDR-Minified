import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    

    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email address is required'
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!email.includes('@')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email address format'
        },
        { status: 400 }
      )
    }

    const emailSent = await sendWelcomeEmail({
      email: email.trim().toLowerCase()
    })


    if (emailSent) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Welcome email sent successfully',
          email: email
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send welcome email'
        },
        { status: 500 }
      )
    }

  } catch {
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}
