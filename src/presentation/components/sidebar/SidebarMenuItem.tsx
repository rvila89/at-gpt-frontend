import { NavLink } from 'react-router-dom'

interface Props {
  to: string
  icon: string
  title: string
}

export const SidebarMenuItem = ({ to, icon, title }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex justify-center items-center bg-[#353535] rounded-md p-2 transition-colors text-white mb-2'
          : 'flex justify-center items-center hover:bg-[#353535] rounded-md p-2 transition-colors hover:text-white mb-2'
      }
    >
      <i className={`${icon} text-2xl mr-4 text-atmira-pink`}></i>
      <div className='flex flex-col flex-grow'>
        <span className='text-grey-800 text-lg font-semibold'>{title}</span>
      </div>
    </NavLink>
  )
}
