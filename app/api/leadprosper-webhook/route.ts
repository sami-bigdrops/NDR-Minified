import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  
  try {
    // Check content type to handle both JSON and form data
    const contentType = request.headers.get('content-type') || ''
    
    let body: Record<string, string> = {}
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
      // Handle form data
      const formData = await request.formData()
      const formEntries = Object.fromEntries(formData.entries())
      // Convert FormDataEntryValue to string
      body = Object.fromEntries(
        Object.entries(formEntries).map(([key, value]) => [key, String(value)])
      )
    } else {
      // Handle JSON data
      body = await request.json()
    }
    
    
    // Extract the required data from LeadProsper webhook
    const { 
      email,
      buyer
    } = body
    

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Missing required field: email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Store email for thank you page and redirect
    // The email will be sent when user reaches the thank you page
    
    // Return redirect URL with email and buyer parameters
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ndr-test.vercel.app'}/thankyou?email=${encodeURIComponent(email)}${buyer ? `&buyer=${encodeURIComponent(buyer)}` : ''}`
    
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Webhook processed successfully',
        email: email,
        buyer: buyer || null,
        redirectUrl: redirectUrl
      },
      { status: 200 }
    )

  } catch (error) {
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle GET requests (for webhook verification if needed)
export async function GET() {
  return NextResponse.json(
    { 
      message: 'LeadProsper webhook endpoint is active',
      timestamp: new Date().toISOString(),
      status: 'OK'
    },
    { status: 200 }
  )
}
