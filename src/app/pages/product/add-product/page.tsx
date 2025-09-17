import { AddProduct, NavBar } from '@/app/components'



export default async function AddProductPage() {
  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <AddProduct />
    </main>
  )
}
