import React from 'react'
import ViewPDF from '@/app/components/quote/components/pdf/PdfView' // Make sure you have a similar component for quotes
import { NavBar } from '@/app/components'



export default async function QuotePdfPage({
  params,
}: {
  params: { quoteId: string }
}) {
  const quoteId = params.quoteId[0]

  return (
    <>
      <NavBar />
      <ViewPDF quoteId={quoteId} />
    </>
  )
}
