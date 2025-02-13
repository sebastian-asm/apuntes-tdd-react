import '@testing-library/jest-dom'

import { server } from './src/test/__mocks__/server'
import { queryClient } from './src/test/__mocks__/render-with-provider'

beforeEach(() => queryClient.clear())
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
