import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Counter from './counter'

/* eslint-disable no-undef */
test('Estado inicial 0', () => {
  render(<Counter />)
  const result = screen.getByText(/Clicks times: 0/i)
  expect(result).toBeInTheDocument()
})

test('Estado cambiando al hacer click en botón', () => {
  render(<Counter />)
  // selector indica que solo busque un botón
  const button = screen.getByText(/click/i, { selector: 'button' })
  fireEvent.click(button)
  const result = screen.getByText(/Clicks times: 1/i)
  expect(result).toBeInTheDocument()
})
