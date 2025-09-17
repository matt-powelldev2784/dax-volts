import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib'

import { badRequestError400 } from '@/app/lib'
import { T_InvoiceRow } from '@/types'
import { serverError500 } from '@/app/lib/apiErrors/serverError'

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const data = await req.json()

  const { totalPrice, invoiceRows } = data
  const invoiceId = data.invoiceId

  if (!invoiceId || !totalPrice || invoiceRows.length === 0)
    return badRequestError400

  const invoiceToUpdate = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  })

  if (!invoiceToUpdate) return badRequestError400
  if (invoiceToUpdate.isActive === false) return badRequestError400

  try {
    await prisma.invoiceRow.deleteMany({
      where: { invoiceId },
    })

    await prisma.invoiceRow.createMany({
      data: invoiceRows.map((invoiceRow: T_InvoiceRow) => ({
        invoiceId: invoiceId,
        productId: invoiceRow.productId,
        quantity: invoiceRow.quantity,
        name: invoiceRow.name,
        description: invoiceRow.description,
        VAT: invoiceRow.VAT,
        buyPrice: invoiceRow.buyPrice,
        sellPrice: invoiceRow.sellPrice,
        totalPrice: invoiceRow.totalPrice,
      })),
    })

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        totalAmount: totalPrice,
      },
    })

    return NextResponse.json({ updatedInvoice }, { status: 201 })
  } catch (error) {
    if (error) return serverError500
  }
}
