/* eslint-disable no-undef */
describe('Agrupador de test', () => {
  test('Demo test 1', () => {
    // toBe compara que sean del mismo tipo y valor
    expect(true).toBe(true)
  })

  test('Demo test 2', () => {
    expect(2 + 2).toBe(4)
  })
})

describe('Matchers', () => {
  test('toEqual', () => {
    const data = { one: 1 }
    data.two = 2
    // toEqual permite comparar object o arrays
    expect(data).toEqual({ one: 1, two: 2 })

    const arr = ['one', 'two']
    expect(arr).toEqual(['one', 'two'])
  })
})
