/* eslint-disable no-undef */
const asyncCallback = (cb) => setTimeout(() => cb(true), 800)
const asyncPromise = () => new Promise((resolve) => resolve(true))

describe('Async', () => {
  // done permite indicar que una función async ya finalizó
  // al omitir el done podríamos tener un falso positivo
  test('Test con callback asincrónico', (done) => {
    asyncCallback((result) => {
      expect(result).toBe(true)
      done()
    })
  })

  // only indica que solo corra este test
  test.only('Test con promesa de JS', async () => {
    const result = await asyncPromise()
    expect(result).toBe(true)
  })
})
