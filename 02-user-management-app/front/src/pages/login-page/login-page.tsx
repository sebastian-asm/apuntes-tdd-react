import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { loginSchema } from './login-schema'

interface Inputs {
  email: string
  password: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register('email', { required: true })} />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" {...register('password', { required: true })} />
        <p>{errors.password?.message}</p>
        <button type="submit">Ingresar</button>
      </form>
    </section>
  )
}
