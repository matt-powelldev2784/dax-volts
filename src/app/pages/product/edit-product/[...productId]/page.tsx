import { EditProduct, NavBar } from '@/app/components'
import { getProduct } from '../getProduct'
import { ServerError } from '@/app/lib/ServerError'



export default async function AddProductPage({
  params,
}: {
  params: { productId: string }
}) {
  const productId = params.productId[0]
  const product = await getProduct(productId)

  if (!product) {
    return <ServerError />
  }

  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <EditProduct product={product} />
    </main>
  )
}
