import atmiraLogo from '../../assets/atmira.png'
import atgptLogo from '../../assets/at-gpt.png'
import Avatar from './Avatar'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav className='bg-atmira-pink border-gray-200 px-4 lg:px-6 py-2.5 max-h-20'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <NavLink to='/'>
            <img src={atmiraLogo} className='mr-3 h-6 sm:h-12' alt='atmira' />
          </NavLink>

          <img src={atgptLogo} className='h-6 sm:h-14' alt='at-gpt Logo' />
          <div className='flex items-center mr-12 cursor-pointer'>
            <span className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm mr-2'>
              Roger Vilà Mateo
            </span>
            <Avatar />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
