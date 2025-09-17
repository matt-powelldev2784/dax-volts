import Image from 'next/image'
import { NavItems } from './components/NavItems'
import { auth } from '@clerk/nextjs/server'

export const NavBar = async () => {
  const { userId } = await auth()

  return (
    <header className="">
      <nav
        className={`flex flex-col items-center md:justify-center lg:flex-row  h-fit w-full bg-darkBlack ${
          userId ? 'lg:justify-between' : 'lg:justify-center'
        }`}
      >
        <a
          href="/"
          className="w-[250px] md:w-[275px] lg:w-[300px] h-full m-2 lg:ml-8"
        >
          <Image
            src="/max_volts_logo.svg"
            alt="Max Volts Logo"
            width={873}
            height={156}
            className=""
          />
        </a>

        <div className="flexRow w-full md:w-auto lg:mr-6">
          {userId ? <NavItems /> : null}
        </div>
      </nav>
    </header>
  )
}
