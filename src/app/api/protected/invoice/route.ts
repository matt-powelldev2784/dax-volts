import { NextRequest, NextResponse } from 'next/server'
import { prisma, badRequestError400 } from '@/app/lib'


export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const pageNumber = url.searchParams.get('page')
  const page = Number(pageNumber) || 1

  const pageSize = 10
  const skip = (page - 1) * pageSize

  const invoices = await prisma.invoice.findMany({
    include: {
      Client: true,
      InvoiceRow: true,
    },
    orderBy: { invoiceNum: 'desc' },
    skip,
    take: pageSize,
  })

  if (invoices.length === 0) {
    return badRequestError400
  }

  return NextResponse.json(invoices, { status: 200 })
}
