import { navItemList } from '../data/navItemsList'
import { NavItem } from './NavItem'

export const NavItems = async () => {
  const NavItems = navItemList.map((item) => {
    if (item.text === 'Login') return null
    return <NavItem key={item.key} itemDetails={item} />
  })

  return (
    <ul className="flex justify-around md:justify-center item-center md:gap-6 lg:gap-6 mx-4 h-full w-full lg:w-auto p-2 pb-3 min-w-[320px]">
      {...NavItems}
    </ul>
  )
}
