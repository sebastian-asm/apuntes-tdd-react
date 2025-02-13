import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

import { loginSchema } from './login-schema'

interface Inputs {
  email: string
  password: string
}

const loginService = async (email: string, password: string): Promise<void> => {
  await axios.post('/login', { email, password })
}

export default function LoginPage() {
  const [loginError, setLoginError] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) })

  const mutation = useMutation({
    mutationFn: ({ email, password }: Inputs) => loginService(email, password)
  })

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    mutation.mutate(
      { email, password },
      {
        onError: (error) => {
          let errorMessage = 'Unexpected error, please try again'
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            errorMessage = 'The email or password are not correct'
          }
          setLoginError(errorMessage)
        }
      }
    )
  }

  return (
    <section>
      <h1>Login</h1>
      {mutation.isPending && (
        <p role="progressbar" aria-label="loading">
          Cargando...
        </p>
      )}
      {mutation.isError && <p>{loginError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register('email', { required: true })} />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" {...register('password', { required: true })} />
        <p>{errors.password?.message}</p>
        <button type="submit" disabled={mutation.isPending}>
          Ingresar
        </button>
      </form>
    </section>
  )
}
