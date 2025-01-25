/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import AsyncList from './asyncList'

test('Mostrar estado inicial', async () => {
  render(<AsyncList />)
  // findByText devuelve una promesa
  const hamburger = await screen.findByText(/hamburger/i)
  expect(hamburger).toBeInTheDocument()
  expect(await screen.findByText(/pizza/i)).toBeInTheDocument()
  expect(await screen.findByText(/tacos/i)).toBeInTheDocument()
})
