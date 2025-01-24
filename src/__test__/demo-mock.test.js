/* eslint-disable no-undef */
import { storage } from '../lib/storage'
import { setUser, getUser } from '../user'

test('Ejemplo de mock', () => {
  const mock = jest.fn() // nos permite construir un mock
  mock()

  // esperar que por lo menos el mock haya sido llamado una vez
  expect(mock).toHaveBeenCalled()

  // espera que el mock haya sido llamado una determinada cantidad
  // expect(mock).toHaveBeenCalledTimes(3)

  // indicar que un mock tiene que retornar un valor, se pueden ir anidando múltiples valores
  const mock2 = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(123)
  const bool = mock2()
  const num = mock2()

  expect(bool).toBe(true)
  expect(num).toBe(123)
})

// creando un mock a partir de una función
jest.mock('../lib/storage')

describe('Ejemplo de mock con función externa', () => {
  const username = 'belu'

  test('setUser', () => {
    setUser(username)
    expect(storage.save).toHaveBeenCalled()
    expect(storage.save).toHaveBeenCalledWith({ key: 'user', value: username })
  })

  test('getUser', () => {
    // manipulación del mock para retornar un valor
    storage.get.mockReturnValueOnce(username)
    const user = getUser()
    expect(user).toBe(username)
    expect(storage.get).toHaveBeenCalled()
  })
})
