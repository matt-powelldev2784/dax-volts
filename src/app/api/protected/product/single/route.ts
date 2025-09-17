import { NextRequest, NextResponse } from 'next/server'
import { prisma, badRequestError400 } from '@/app/lib'

import { T_Product } from '@/types'

export const GET = async (req: NextRequest, _res: NextResponse) => {
  const url = new URL(req.url)
  const productId = url.searchParams.get('product_id')

  if (!productId) {
    return badRequestError400
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  return NextResponse.json(product, { status: 200 })
}

export const PUT = async (req: NextRequest, _res: NextResponse) => {
  const data: T_Product = await req.json()
  const { id, name, description, buyPrice, sellPrice, VAT } = data

  if (
    !id ||
    !name ||
    !description ||
    buyPrice < 0 ||
    sellPrice < 0 ||
    VAT < 0
  ) {
    return badRequestError400
  }

  const updatedProduct = await prisma.product.update({
    where: { id: data.id },
    data: {
      ...data,
    },
  })

  return NextResponse.json({ updatedProduct }, { status: 200 })
}
