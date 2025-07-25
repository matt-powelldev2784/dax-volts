'use client'

import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hooks/reduxsHooks'
import { resetToInitialState } from '@/redux/slice/invoiceSlice'
import { PageTitle, Button } from '@/app/ui/'
import Image from 'next/image'

interface QuoteMenuProps {
  flexDirection?: string
}

export const QuoteMenu = ({ flexDirection }: QuoteMenuProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const resetInvoiceState = () => {
    dispatch(resetToInitialState())
  }

  return (
    <div className={`flexCol gap-4 mt-4 mb-2 mx-4`}>
      <PageTitle
        text={'Quote Menu'}
        imgPath={'/icons/quote.svg'}
        divClasses=""
      />

      <div className={`flexCol gap-4  ${flexDirection}`}>
        <Button
          type="button"
          optionalClasses="text-white text-lg bg-mvOrange h-[145px] w-[300px] flex gap-2"
          buttonText="Create Quote"
          disabled={false}
          onClick={() => {
            resetInvoiceState()
            router.push('/pages/quote/create-quote')
          }}
        >
          <Image
            src="/icons/add_quote_white.svg"
            alt="Person icon"
            width={80}
            height={80}
            className="p-2"
          />
        </Button>

        <Button
          type="button"
          optionalClasses="text-white text-lg bg-mvOrange h-[145px] w-[300px] flex gap-2"
          buttonText="Quote List"
          disabled={false}
          onClick={() => {
            resetInvoiceState()
            window.location.href = '/pages/quote/quote-list/1'
          }}
        >
          <Image
            src="/icons/quote_white.svg"
            alt="Person icon"
            width={80}
            height={80}
            className="p-2"
          />
        </Button>
      </div>
    </div>
  )
}
