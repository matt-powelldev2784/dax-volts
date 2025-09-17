import React from 'react'
import ViewPDF from '@/app/components/invoice/components/pdf/PdfView'
import { NavBar } from '@/app/components'



export default async function InvoicePdfPage({
  params,
}: {
  params: { invoiceId: string }
}) {
  const invoiceId = params.invoiceId[0]

  return (
    <>
      <NavBar />
      <ViewPDF invoiceId={invoiceId} />
    </>
  )
}
