import { screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'

import { renderWithProvider } from '../../test/__mocks__/render-with-provider'
import { server } from '../../test/__mocks__/server'
import LoginPage from './login-page'

const getSubmitButton = () => screen.getByRole('button', { name: /ingresar/i })

const mockServerWithError = (statusCode: number) =>
  server.use(rest.post('/login', (_, res, ctx) => res(ctx.delay(1), ctx.status(statusCode))))

const fillAndSendLoginForm = async () => {
  await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
  await userEvent.type(screen.getByLabelText(/password/i), '123456')
  await userEvent.click(getSubmitButton())
}

test('Correcto renderizado del título', () => {
  renderWithProvider(<LoginPage />)
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
})

test('Correcto renderizado de los elementos del forms', () => {
  renderWithProvider(<LoginPage />)
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(getSubmitButton()).toBeInTheDocument()
})

test('Validando los inputs requeridos', async () => {
  renderWithProvider(<LoginPage />)
  userEvent.click(getSubmitButton())
  expect(await screen.findByText(/The email is required/i)).toBeInTheDocument()
  expect(await screen.findByText(/The password is required/i)).toBeInTheDocument()
})

test('Validando el formato del email', async () => {
  renderWithProvider(<LoginPage />)
  await userEvent.type(screen.getByLabelText(/email/i), 'Invalid email')
  await userEvent.click(getSubmitButton())
  expect(await screen.findByText(/The email is not valid/i)).toBeInTheDocument()
})

test('Deshabilitar el botón mientras el formulario se está enviando', async () => {
  renderWithProvider(<LoginPage />)
  expect(getSubmitButton()).not.toBeDisabled()
  await fillAndSendLoginForm()
  await waitFor(() => expect(getSubmitButton()).toBeDisabled())
})

test('Mostrar loading cuando se está enviando el formulario', async () => {
  renderWithProvider(<LoginPage />)
  expect(getSubmitButton()).not.toBeDisabled()
  expect(screen.queryByRole('progressbar', { name: /loading/i })).not.toBeInTheDocument()
  await fillAndSendLoginForm()
  expect(await screen.findByRole('progressbar', { name: /loading/i }))
})

test('Mostrar mensaje de error "Unexpected error, please try again"', async () => {
  mockServerWithError(500)
  renderWithProvider(<LoginPage />)
  await fillAndSendLoginForm()
  expect(await screen.findByText('Unexpected error, please try again')).toBeInTheDocument()
})

test('Mostrar mensaje de error cuando el login no fue correcto', async () => {
  mockServerWithError(401)
  renderWithProvider(<LoginPage />)
  await fillAndSendLoginForm()
  expect(await screen.findByText('The email or password are not correct')).toBeInTheDocument()
})
