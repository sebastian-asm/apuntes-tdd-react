/* eslint-disable no-undef */
describe('Configuración inicial en los test', () => {
  // beforeAll se ejecutará antes de todos los test
  beforeAll(() => {
    console.log('beforeAll')
  })

  // está su contraparte afterAll el cual se ejecutará despúes de todos los test
  afterAll(() => {
    console.log('afterAll')
  })

  // beforeEach se ejecuta antes por cada uno de los test
  // afterEach lo hará al finalizar cada uno
  beforeEach(() => {
    console.log('beforeEach')
  })

  test('Demo 1', () => {
    expect(true).toBe(true)
  })

  test('Demo 2', () => {
    expect(true).toBe(true)
  })
})
