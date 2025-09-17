import { NextRequest, NextResponse } from 'next/server'
import { prisma, badRequestError400 } from '@/app/lib'
import { T_Client } from '../../../../types/client'

export const GET = async (_req: NextRequest, _res: NextResponse) => {
  const clients = await prisma.client.findMany({
    where: { isHidden: false },
    orderBy: { name: 'asc' },
  })
  return NextResponse.json(clients, { status: 200 })
}

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const data: T_Client = await req.json()
  const { name } = data

  if (!name) {
    return badRequestError400
  }

  const newClient = await prisma.client.create({
    data: {
      ...data,
    },
  })

  return NextResponse.json({ newClient }, { status: 201 })
}
