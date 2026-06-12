export function Logout(navigate) {
  window.localStorage.clear()
  navigate('/')
}
