import { storage } from '../lib/storage'

export const setUser = (user) => {
  storage.save({ key: 'user', value: user })
}

export const getUser = () => {
  return storage.get({ key: 'user' })
}
