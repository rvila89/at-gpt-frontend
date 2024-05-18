import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from '@hookform/error-message'

type FormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const { errors } = formState
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
      <form
        onSubmit={handleSubmit(() => {
          navigate('/chat')
        })}
      >
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Email:
          </label>
          <div className='mt-2'>
            <input
              id='email'
              autoComplete='email'
              className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6'
              {...register('email', {
                // required: {
                //   value: true,
                //   message: 'Email is required',
                // },
                // validate: {
                //   isValidEmail: (value) =>
                //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                //       value
                //     ) || 'Email is not valid',
                // },
              })}
            />
            <ErrorMessage
              errors={errors}
              name='email'
              render={({ message }) => (
                <p className='text-red-500 mt-2'>{message}</p>
              )}
            />
          </div>
        </div>

        <div className='mt-8'>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Password:
          </label>
          <div className='mt-2'>
            <input
              id='password'
              type='password'
              autoComplete='current-password'
              className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6 focus:border-none'
              {...register('password', {
                // required: {
                //   value: true,
                //   message: 'Password is required',
                // },
                // validate: {
                //   minLength: (value) =>
                //     value.length >= 8 ||
                //     'Password should has more than 8 characters',
                //   isCapitalLetter: (value) =>
                //     /[A-Z]/.test(value) ||
                //     'Password should has at least one capital letter',
                //   isLowerCaseLetter: (value) =>
                //     /[a-z]/.test(value) ||
                //     'Password should has at least one lower case letter',
                //   isContainNumber: (value) =>
                //     /\d/.test(value) ||
                //     'Password should has at least one number',
                // },
              })}
            />
            <ErrorMessage
              errors={errors}
              name='password'
              render={({ message }) => (
                <p className='text-red-500 mt-2'>{message}</p>
              )}
            />
          </div>
        </div>
        <div className='mt-10'>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-atmira-pink px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
          >
            ENTRAR
          </button>
        </div>
      </form>
    </div>
  )
}
