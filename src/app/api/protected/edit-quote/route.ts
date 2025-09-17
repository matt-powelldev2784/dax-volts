import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib'

import { badRequestError400 } from '@/app/lib'
import { T_QuoteRow } from '@/types'
import { serverError500 } from '@/app/lib/apiErrors/serverError'

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const data = await req.json()
  console.log('data', data)

  const { totalPrice, quoteRows } = data
  const quoteId = data.quoteId

  if (!quoteId || !totalPrice || quoteRows.length === 0)
    return badRequestError400

  const quoteToUpdate = await prisma.quote.findUnique({
    where: { id: quoteId },
  })

  if (!quoteToUpdate) return badRequestError400

  try {
    await prisma.quoteRow.deleteMany({
      where: { quoteId },
    })

    await prisma.quoteRow.createMany({
      data: quoteRows.map((quoteRow: T_QuoteRow) => ({
        quoteId: quoteId,
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

    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        totalAmount: totalPrice,
      },
    })

    return NextResponse.json({ updatedQuote }, { status: 201 })
  } catch (error) {
    if (error) return serverError500
  }
}
