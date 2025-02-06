export const storage = {
  save({ key, value }) {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  get({ key }) {
    return JSON.parse(localStorage.getItem(key))
  }
}
