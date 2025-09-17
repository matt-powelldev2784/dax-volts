import { EditQuote, NavBar } from '@/app/components'



export default async function EditQuotePage({
  params,
}: {
  params: { quoteId: string }
}) {
  const quoteId = params.quoteId[0]
  console.log('quoteId', quoteId)

  return (
    <div>
      <NavBar />
      <EditQuote quoteId={quoteId} />
    </div>
  )
}
