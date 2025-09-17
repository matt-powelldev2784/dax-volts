import ViewPDF from '@/app/components/quote/components/pdf/PdfView'
import { NavBar } from '@/app/components'

export default async function QuotePdfPage({
  params,
}: {
  params: Promise<{ quoteId: string[] }>
}) {
  const { quoteId } = await params
  const id = Array.isArray(quoteId) ? quoteId[0] : quoteId

  return (
    <>
      <NavBar />
      <ViewPDF quoteId={id} />
    </>
  )
}
