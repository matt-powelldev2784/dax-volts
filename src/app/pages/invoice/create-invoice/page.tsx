import { CreateInvoice, NavBar } from '@/app/components'



export default async function CreateInvoicePage() {
  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <CreateInvoice />
    </main>
  )
}
