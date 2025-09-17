import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib'
import { badRequestError400 } from '@/app/lib'
import { T_InvoiceRow } from '@/types'

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const { clientId, totalPrice, invoiceRows } = data

  if (!clientId || !totalPrice || invoiceRows.length === 0)
    return badRequestError400

  const newInvoice = await prisma.invoice.create({
    data: {
      clientId: data.clientId,
      totalAmount: data.totalPrice,
    },
  })

  await prisma.invoiceRow.createMany({
    data: invoiceRows.map((invoiceRow: T_InvoiceRow) => ({
      invoiceId: newInvoice.id,
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

  const activeInvoice = await prisma.invoice.update({
    where: { id: newInvoice.id },
    data: {
      isActive: true,
    },
  })

  return NextResponse.json({ activeInvoice }, { status: 201 })
}
