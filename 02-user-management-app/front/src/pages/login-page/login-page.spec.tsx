import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginPage from './login-page'

const getSubmitButton = () => screen.getByRole('button', { name: /ingresar/i })

test('Correcto renderizado del título', () => {
  render(<LoginPage />)
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
})

test('Correcto renderizado de los elementos del forms', () => {
  render(<LoginPage />)
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(getSubmitButton()).toBeInTheDocument()
})

test('Validando los inputs requeridos', async () => {
  render(<LoginPage />)
  userEvent.click(getSubmitButton())
  expect(await screen.findByText(/The email is required/i)).toBeInTheDocument()
  expect(await screen.findByText(/The password is required/i)).toBeInTheDocument()
})
