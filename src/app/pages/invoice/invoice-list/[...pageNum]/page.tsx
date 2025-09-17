import { InvoiceList, NavBar } from '@/app/components'
import { getTenInvoices } from '../getTenInvoices'
import { getMaxInvoicePages } from '../getMaxInvoicePages'
import { ServerError } from '@/app/lib/ServerError'



export default async function InvoiceListPage({
  params,
}: {
  params: { pageNum: string }
}) {
  const maxInvoicePages = await getMaxInvoicePages()
  const page = Number(params.pageNum[0])
  const invoices = await getTenInvoices(page)

  if (!invoices) {
    return <ServerError />
  }

  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <InvoiceList
        invoices={invoices}
        maxInvoicePages={maxInvoicePages}
        currentPageNum={page}
        pageTitle="Invoice List"
      />
    </main>
  )
}
