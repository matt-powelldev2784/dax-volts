import { ProductList, NavBar } from '@/app/components'
import { getTenProducts } from '../getTenProducts'
import { getMaxProductPage } from '../getMaxProductPage'

export default async function ProductListPage({
  params,
}: {
  params: Promise<{ pageNum: string[] }>
}) {
  const { pageNum } = await params
  const page = Number(Array.isArray(pageNum) ? pageNum[0] : pageNum) || 1

  const maxProductPage = await getMaxProductPage()
  const products = await getTenProducts(page)

  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <ProductList
        products={products}
        maxProductPages={maxProductPage}
        currentPageNum={page}
      />
    </main>
  )
}
