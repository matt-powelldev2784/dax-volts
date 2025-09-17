import { NextRequest, NextResponse } from 'next/server'
import { prisma, badRequestError400 } from '@/app/lib'


export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const invoiceId = url.searchParams.get('invoice_id')
  console.log('invoiceId', invoiceId)

  if (!invoiceId) {
    return badRequestError400
  }

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    include: {
      Client: true,
      InvoiceRow: true,
    },
  })

  return NextResponse.json(invoice, { status: 200 })
}
