import { NavBar } from '@/app/components'
import {
  ClientMenu,
  ProductMenu,
  InvoiceMenu,
  QuoteMenu,
} from '@/app/components'

export default async function Dashboard() {
  return (
    <>
      <NavBar />
      <nav className="flex flex-row w-full justify-center items-start flex-wrap gap-2 md:mt-4 mb-8">
        <QuoteMenu />
        <InvoiceMenu />
        <ClientMenu />
        <ProductMenu />
      </nav>
    </>
  )
}
