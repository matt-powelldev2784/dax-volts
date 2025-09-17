import { EditQuote, NavBar } from '@/app/components'

export default async function EditQuotePage({
  params,
}: {
  params: Promise<{ quoteId: string[] }>
}) {
  const { quoteId } = await params
  const id = Array.isArray(quoteId) ? quoteId[0] : quoteId

  return (
    <div>
      <NavBar />
      <EditQuote quoteId={id} />
    </div>
  )
}
