import { NextRequest, NextResponse } from 'next/server'
import { prisma, badRequestError400 } from '@/app/lib'
import { T_Client } from '@/types'

export const PUT = async (req: NextRequest, _res: NextResponse) => {
  const data: T_Client = await req.json()
  const { id, name } = data

  if (!id || !name) {
    return badRequestError400
  }

  const updatedClient = await prisma.client.update({
    where: { id: data.id },
    data: {
      ...data,
    },
  })

  return NextResponse.json({ updatedClient }, { status: 200 })
}
