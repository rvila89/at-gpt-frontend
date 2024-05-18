import { useState } from 'react'
import AtGptLogo from '../../../assets/at-gpt.svg'
import { LoginForm } from '../../components'

export const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false)
  return (
    <div className='bg-atmira-pink bg-opacity-20'>
      <div className='h-screen flex items-center max-w-screen-lg m-auto '>
        <img
          src={AtGptLogo}
          className='max-w-[45%]'
          alt='at-gpt Logo'
          onLoad={() => setShowLoginForm(true)}
        />
        {showLoginForm && <LoginForm />}
      </div>
    </div>
  )
}
