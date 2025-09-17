import { NextRequest, NextResponse } from 'next/server'
import { prisma, badRequestError400 } from '@/app/lib'


export const POST = async (req: NextRequest, _res: NextResponse) => {
  const url = new URL(req.url)
  const invoiceId = url.searchParams.get('invoice_id')

  if (!invoiceId) {
    return badRequestError400
  }

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
  })

  const isActive = invoice?.isActive

  const updatedInvoice = await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      isActive: !isActive,
    },
    include: {
      Client: true,
      InvoiceRow: true,
    },
  })

  return NextResponse.json(updatedInvoice, { status: 200 })
}
