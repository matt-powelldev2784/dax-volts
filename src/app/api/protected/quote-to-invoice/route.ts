import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib'

import { badRequestError400 } from '@/app/lib'
import { T_QuoteRow } from '@/types'

export const POST = async (req: NextRequest) => {
  const { quoteId } = await req.json()

  if (!quoteId) return badRequestError400

  // Fetch the quote and its rows
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: { QuoteRow: true },
  })

  if (!quote) return badRequestError400

  // Create a new invoice using the quote data
  const newInvoice = await prisma.invoice.create({
    data: {
      clientId: quote.clientId,
      totalAmount: quote.totalAmount,
      quoteNum: quote.quoteNum,
    },
  })

  // Create invoice rows using the quote rows
  await prisma.invoiceRow.createMany({
    data: quote.QuoteRow.map((quoteRow: T_QuoteRow) => ({
      invoiceId: newInvoice.id,
      productId: quoteRow.productId,
      quantity: quoteRow.quantity,
      name: quoteRow.name,
      description: quoteRow.description,
      VAT: quoteRow.VAT,
      buyPrice: quoteRow.buyPrice,
      sellPrice: quoteRow.sellPrice,
      totalPrice: quoteRow.totalPrice,
    })),
  })

  // make quote active
  await prisma.quote.update({
    where: { id: quoteId },
    data: {
      isActive: true,
    },
  })

  const activeInvoice = await prisma.invoice.update({
    where: { id: newInvoice.id },
    data: {
      isActive: true,
    },
  })

  return NextResponse.json({ activeInvoice }, { status: 201 })
}
