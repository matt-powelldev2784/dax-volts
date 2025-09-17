import { EditClient, NavBar } from '@/app/components'
import { getClient } from '../getClient'
import { ServerError } from '@/app/lib/ServerError'

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ clientId: string[] }>
}) {
  const { clientId } = await params
  const id = Array.isArray(clientId) ? clientId[0] : clientId

  const client = await getClient(id)
  if (!client) return <ServerError />

  return (
    <main className="min-h-screen min-w-screen">
      <NavBar />
      <EditClient client={client} />
    </main>
  )
}
