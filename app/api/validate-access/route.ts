import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    // Get the token from httpOnly cookie
    const cookieToken = request.cookies.get('thankyou_access')?.value

    if (!cookieToken) {
      return NextResponse.json({ error: 'Access token not found' }, { status: 401 })
    }

    // Validate that tokens match
    if (token !== cookieToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Token is valid - clear the cookie to prevent reuse
    const response = NextResponse.json({ success: true, message: 'Access validated' })
    response.cookies.delete('thankyou_access')
    
    return response
  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 })
  }
}
