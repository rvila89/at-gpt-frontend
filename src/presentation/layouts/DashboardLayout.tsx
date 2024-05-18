import { Outlet } from 'react-router-dom'
import { menuRoutes } from '../router/router'
import { SidebarMenuItem } from '../components'
import Header from './Header'

export const DashboardLayout = () => {
  return (
    <>
      <Header />
      <main className='flex flex-row mt-7 h-[calc(100vh-76px-28px-28px)]'>
        <nav className='hidden sm:flex flex-col ml-5 w-[400px]  bg-[#f3f2f1] p-5 rounded-3xl'>
          <span className='text-xl'>Gestión de Personas y Talento</span>

          <div className='border-gray-700 border my-3' />

          {/* Opciones del menú */}
          {menuRoutes.map((option) => (
            <SidebarMenuItem key={option.to} {...option} />
          ))}
        </nav>

        <section className='ml-20 mr-5 flex flex-col w-full bg-atmira-pink bg-opacity-10 p-5 rounded-3xl'>
          <div className='flex flex-row h-full'>
            <div className='flex flex-col flex-auto h-full p-1'>
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
