import { InvoiceList, NavBar } from '@/app/components'
import { getTenActiveInvoices } from '../getTenActiveInvoices'
import { getMaxActiveInvoicePages } from '../getMaxActiveInvoicePages'
import { ServerError } from '@/app/lib/ServerError'

export default async function InvoiceListPage({
  params,
}: {
  params: Promise<{ pageNum: string[] }>
}) {
  const { pageNum } = await params
  const page = Number(Array.isArray(pageNum) ? pageNum[0] : pageNum) || 1

  const maxInvoicePages = await getMaxActiveInvoicePages()
  const invoices = await getTenActiveInvoices(page)

  if (!invoices) return <ServerError />

  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <InvoiceList
        invoices={invoices}
        maxInvoicePages={maxInvoicePages}
        currentPageNum={page}
        pageTitle="Due Invoices"
      />
    </main>
  )
}
