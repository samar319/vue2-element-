export function throttle (func, wait = 200) {
  let lastTime
  return function (...rest) {
    if (!lastTime || new Date().getTime() - lastTime > wait) {
      lastTime = +new Date()
      func.apply(this, rest)
    }
  }
}
