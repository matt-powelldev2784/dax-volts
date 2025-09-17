'use client'

import React from 'react'
import { PageTitle } from '@/app/ui'
import { SignOutButton } from '@clerk/nextjs'

export const signOut = () => {
  return (
    <div className="flexCol">
      <PageTitle
        text={'Sign Out'}
        imgPath={'/icons/error.svg'}
        divClasses="mt-4 mb-4"
      />

      <SignOutButton />
    </div>
  )
}
