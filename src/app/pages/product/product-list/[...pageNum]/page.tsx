import { ProductList, NavBar } from '@/app/components'
import { getTenProducts } from '../getTenProducts'
import { getMaxProductPage } from '../getMaxProductPage'



export default async function ProductListPage({
  params,
}: {
  params: { pageNum: string }
}) {
  const maxProductPage = await getMaxProductPage()
  const page = Number(params.pageNum[0])
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
