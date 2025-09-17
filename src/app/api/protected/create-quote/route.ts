import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib'
import { badRequestError400 } from '@/app/lib'
import { T_QuoteRow } from '@/types' // Make sure to define this type

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const { clientId, totalPrice, quoteRows } = data

  if (!clientId || !totalPrice || quoteRows.length === 0)
    return badRequestError400

  const newQuote = await prisma.quote.create({
    data: {
      clientId: data.clientId,
      totalAmount: data.totalPrice,
    },
  })

  await prisma.quoteRow.createMany({
    data: quoteRows.map((quoteRow: T_QuoteRow) => ({
      quoteId: newQuote.id,
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

  const activeQuote = await prisma.quote.update({
    where: { id: newQuote.id },
    data: {
      isActive: false,
    },
  })

  return NextResponse.json({ activeQuote }, { status: 201 })
}
