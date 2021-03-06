import axios from 'axios'

export function searchUsers (searchQuery) {
  return axios
    .get(`https://api.github.com/search/users?q=${searchQuery}`)
    .then(response => response.data)
}

let timeoutId

export function debounce (func, ms) {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  timeoutId = setTimeout(func, ms)
}
