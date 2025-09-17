import { ClientList, NavBar } from '@/app/components'
import { getTenClients } from '../getTenClients'
import { getMaxClienttPages } from '../getMaxClientPages'



export default async function ClienttListPage({
  params,
}: {
  params: { pageNum: string }
}) {
  const maxClientPages = await getMaxClienttPages()
  const page = Number(params.pageNum[0])
  const clients = await getTenClients(page)

  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <ClientList
        clients={clients}
        maxClientPages={maxClientPages}
        currentPageNum={page}
      />
      {/* <ProductList
        products={products}
        maxProductPages={maxProductPage}
        currentPageNum={page}
      /> */}
    </main>
  )
}
