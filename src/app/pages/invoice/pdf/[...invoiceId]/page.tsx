import ViewPDF from '@/app/components/invoice/components/pdf/PdfView'
import { NavBar } from '@/app/components'

export default async function InvoicePdfPage({
  params,
}: {
  params: Promise<{ invoiceId: string[] }>
}) {
  const { invoiceId } = await params
  const id = Array.isArray(invoiceId) ? invoiceId[0] : invoiceId

  return (
    <>
      <NavBar />
      <ViewPDF invoiceId={id} />
    </>
  )
}
