import jsCookie from 'js-cookie'

export const createStorage = key => ({
  get: () => jsCookie.get(key),
  set: value => jsCookie.set(key, value),
  remove: () => jsCookie.remove(key)
})
