import { NextRequest, NextResponse } from 'next/server'
import { prisma, badRequestError400 } from '@/app/lib'


export const PUT = async (req: NextRequest, _res: NextResponse) => {
  const url = new URL(req.url)
  const id = url.searchParams.get('product_id')

  if (!id) {
    return badRequestError400
  }

  const updatedClient = await prisma.product.update({
    where: { id },
    data: {
      isHidden: true,
    },
  })

  return NextResponse.json({ updatedClient }, { status: 200 })
}
