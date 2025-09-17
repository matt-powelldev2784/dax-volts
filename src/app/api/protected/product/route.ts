import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib'

import { badRequestError400 } from '@/app/lib'
import { T_Product } from '@/types'

export const GET = async (_req: NextRequest, _res: NextResponse) => {
  const products = await prisma.product.findMany({
    where: { isHidden: false },
    orderBy: { name: 'asc' },
  })
  return NextResponse.json(products, { status: 200 })
}

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const data: T_Product = await req.json()
  const { name, description, buyPrice, sellPrice, VAT } = data

  if (!name || !description || buyPrice < 0 || sellPrice < 0 || VAT < 0) {
    return badRequestError400
  }

  const newProduct = await prisma.product.create({
    data: {
      ...data,
    },
  })

  return NextResponse.json({ newProduct }, { status: 201 })
}