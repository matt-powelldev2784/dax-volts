import { EditInvoice, NavBar } from '@/app/components'

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string[] }>
}) {
  const { invoiceId } = await params
  const id = Array.isArray(invoiceId) ? invoiceId[0] : invoiceId

  return (
    <div>
      <NavBar />
      <EditInvoice invoiceId={id} />
    </div>
  )
}
