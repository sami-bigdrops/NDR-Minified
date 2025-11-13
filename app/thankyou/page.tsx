'use client'

import React, { useEffect, useState, Suspense, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useSearchParams } from 'next/navigation'

const ads = [
  {
    image: '/nerdwallet.png',
    link: 'https://www.platinum-home-track.com/28KL6/3GHXJS7/?sub1=ndr_${utmParams.utm_source}&sub2=${utmParams.utm_id}&sub3=${utmParams.utm_s1}'
  },
  {
    image: '/adt.png',
    link: 'https://www.platinum-home-track.com/28KL6/49FHNSP/?sub1=ndr_${utmParams.utm_source}&sub2=${utmParams.utm_id}&sub3=${utmParams.utm_s1}'
  },
  {
    image: '/ahs.jpg',
    link: 'https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=113&sub1=ndr_${utmParams.utm_source}&sub2=${utmParams.utm_id}&sub3=${utmParams.utm_s1}'
  },
  {
    image: '/arw-home.png',
    link: 'https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=114&sub1=ndr_${utmParams.utm_source}&sub2=${utmParams.utm_id}&sub3=${utmParams.utm_s1}'
  }
]

interface UtmParams {
  utm_source: string
  utm_id: string
  utm_s1: string
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: '',
    utm_id: '',
    utm_s1: ''
  })
  const [emailSent, setEmailSent] = useState(false)
  const [buyer, setBuyer] = useState<string | null>(null)
  const [hasProcessedUrl, setHasProcessedUrl] = useState(false)


  // Function to send welcome email from thank you page
  const sendWelcomeEmailFromThankYou = useCallback(async () => {
    try {
      // Get email from URL parameters (passed from webhook)
      const emailFromUrl = searchParams.get('email');
      
      // Fallback to localStorage if URL parameter not available
      const formData = localStorage.getItem('form_data');
      const emailFromStorage = formData ? JSON.parse(formData).email : null;
      
      const email = emailFromUrl || emailFromStorage;
      
      
      if (!email) {
        return;
      }
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email
        })
      });
      
      if (response.ok) {
        setEmailSent(true);
      }
    } catch {
    }
  }, [searchParams]);

  // Protection useEffect - runs first to check access authorization
  useEffect(() => {
    // Prevent multiple runs
    if (hasProcessedUrl) return;
    
    const checkAccess = async () => {
      try {
        // Check if user came from webhook (has email parameter)
        const emailFromUrl = searchParams.get('email');
        const buyerFromUrl = searchParams.get('buyer');
        
        if (emailFromUrl) {
          // User came from webhook or form submission with email - allow access
          setIsAuthorized(true);
          setIsLoading(false);
          setHasProcessedUrl(true);
          
          // Set buyer from URL parameters
          if (buyerFromUrl) {
            setBuyer(buyerFromUrl);
          }
          
          // Clean URL by removing query parameters after extracting the data
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
              window.history.replaceState({}, document.title, cleanUrl);
            }
          }, 100);
          
          // Send welcome email if not already sent
          if (!emailSent) {
            sendWelcomeEmailFromThankYou();
          }
          return;
        }

        // Check for access token in localStorage (for direct access)
        const token = localStorage.getItem('thankyou_token');
        const expiresAt = localStorage.getItem('thankyou_expires');

        if (!token || !expiresAt) {
          router.replace('/');
          return;
        }

        // Check if token has expired
        const currentTime = Date.now();
        const tokenExpiry = parseInt(expiresAt, 10);
        
        if (currentTime > tokenExpiry) {
          localStorage.removeItem('thankyou_token');
          localStorage.removeItem('thankyou_expires');
          router.replace('/');
          return;
        }

        // Validate token against server (optional additional security check)
        try {
          const response = await fetch('/api/validate-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          });
          
          if (!response.ok) {
            throw new Error('Token validation failed');
          }
        } catch {
          // If validation endpoint doesn't exist or fails, we'll rely on localStorage validation
        }

        // All checks passed - authorize access
        setIsAuthorized(true);
        
        // Clear the token to prevent reuse (one-time access)
        localStorage.removeItem('thankyou_token');
        localStorage.removeItem('thankyou_expires');
        
        // Send welcome email if not already sent
        if (!emailSent) {
          sendWelcomeEmailFromThankYou();
        }
      } catch {
        router.replace('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [router, emailSent, sendWelcomeEmailFromThankYou, hasProcessedUrl, searchParams]);

  useEffect(() => {
    // Skip UTM parameter processing if not authorized
    if (!isAuthorized) return;

    // Helper function to get cookie value
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
      return '';
    };

    // Helper function to set cookie
    const setCookie = (name: string, value: string, days: number = 30) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    // Get UTM parameters from URL
    const utm_source = searchParams.get('utm_source') || ''
    const utm_id = searchParams.get('utm_id') || ''
    const utm_s1 = searchParams.get('utm_s1') || ''

    // If URL parameters exist, use them and save to cookies
    if (utm_source || utm_id || utm_s1) {
      if (utm_source) setCookie('subid1', utm_source);
      if (utm_id) setCookie('subid2', utm_id);
      if (utm_s1) setCookie('subid3', utm_s1);
      
      setUtmParams({ utm_source, utm_id, utm_s1 })
    } else {
      // If no URL parameters, try to read from cookies
      const cookieUtmSource = getCookie('subid1') || '';
      const cookieUtmId = getCookie('subid2') || '';
      const cookieUtmS1 = getCookie('subid3') || '';
      
      setUtmParams({
        utm_source: cookieUtmSource,
        utm_id: cookieUtmId,
        utm_s1: cookieUtmS1
      })
    }
  }, [searchParams, isAuthorized])

  // Show loading state while checking authorization
  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  // Show nothing if not authorized (redirect is in progress)
  if (!isAuthorized) {
    return null;
  }

  return (
    <main>
      {/* Thank You Section */}
      <section id="thankyou" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="thankyou-content text-center max-w-2xl mx-auto">
            <div className="mb-8">
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-12">
              Thank you!
            </h3>
            
            {/* Show buyer logo only if buyer is known and not empty */}
            {buyer && buyer.trim() !== '' && (
              <div className="mb-8">
                <Image 
                  src={`/buyer/${buyer.toLowerCase().replace(/\s+/g, '-')}.png`}
                  alt={`${buyer} Logo`}
                  width={200}
                  height={100}
                  className="mx-auto h-20 w-auto mb-4"
                />
              </div>
            )}
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Congratulations! You have been matched with our partner. You will be contacted by a Debt Relief Specialist shortly.
            </p>
            
            {/* Email confirmation message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-800 font-medium">
                ✓ A confirmation message has been sent to your email address.
              </p>
            </div>
            <div className="thankyou-contact-container bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                For immediate assistance
              </h4>
              <p className="text-gray-600">
                Call us at{' '}
                <a 
                  href="tel:+18664951543" 
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  1-(866)-495-1543
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Divider */}
      <div className="thankyou-divider h-1 bg-gradient-to-r from-red-500 to-blue-600"></div>

      {/* Ad Section */}
      <section id="ad" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="ad-content text-center max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 mb-8 font-medium">
              In addition to debt relief, here are {ads.length} great offers.
            </p>

            <div className="ad-images grid grid-cols-1 md:grid-cols-1 gap-8">
              {ads.map((ad, index) => {
                // Replace template variables in the ad link
                const processedLink = ad.link
                  .replace('${utmParams.utm_source}', utmParams.utm_source || '')
                  .replace('${utmParams.utm_id}', utmParams.utm_id || '')
                  .replace('${utmParams.utm_s1}', utmParams.utm_s1 || '');
                
                return (
                  <a 
                    key={index}
                    href={processedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-transform hover:scale-105"
                  >
                    <Image 
                      src={ad.image} 
                      alt="Ads Image" 
                      width={400} 
                      height={300}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  )
}
