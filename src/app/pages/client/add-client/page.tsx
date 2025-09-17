import { AddClient, NavBar } from '@/app/components'

export default async function AddClientPage() {
  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <AddClient />
    </main>
  )
}
