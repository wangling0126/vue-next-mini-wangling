export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}
export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
