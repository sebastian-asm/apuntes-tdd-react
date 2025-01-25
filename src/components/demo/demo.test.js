/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' // para tener acceso a toBeInTheDocument

import Demo from './demo'

test('Renderizar componente', () => {
  render(<Demo />)
  // screen.debug()
  const title = screen.getByText(/demo/i)
  // screen.debug(title)
  expect(title).toBeInTheDocument()
})
