import { rest } from 'msw'

// se agrega el delay para no tener error en el test
export const handlers = [rest.post('/login', (_, res, ctx) => res(ctx.delay(1), ctx.status(200)))]
