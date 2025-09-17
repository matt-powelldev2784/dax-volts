import { EditInvoice, NavBar } from '@/app/components'



export default async function EditInvoicePage({
  params,
}: {
  params: { invoiceId: string }
}) {
  const invoiceId = params.invoiceId[0]

  return (
    <div>
      <NavBar />
      <EditInvoice invoiceId={invoiceId} />
    </div>
  )
}
