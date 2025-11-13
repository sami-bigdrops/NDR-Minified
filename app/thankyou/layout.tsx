import React from 'react'
import Navbar from '../../ndr/navbar'
import Footer from '../../ndr/footer'

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
