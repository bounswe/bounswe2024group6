import axios from 'axios'
import { isEmpty } from 'lodash-es'

function getAuthUser() {
  const jwt = window.localStorage.getItem('jwtToken')

  if (!jwt) return {}

  return JSON.parse(atob(jwt))
}

const actions = {
  login: (user) => {
    window.localStorage.setItem('jwtToken', btoa(JSON.stringify(user)))

    axios.defaults.headers.Authorization = `Token ${user.token}`
  },
  logout: () => {
    window.localStorage.removeItem('jwtToken')
  },
  checkAuth: () => {
    const authUser = getAuthUser()

    if (!authUser || isEmpty(authUser)) {
      actions.logout()
      return false
    } else {
        return true
    }
  },
  getToken: () => {
    const authUser = getAuthUser()

    return authUser.token
  },
  getUsername: () => {
    const authUser = getAuthUser()

    return authUser.username
  },
  getProfileImage: () => {
    const authUser = getAuthUser()

    return authUser.profile_image
  },
  setProfileImage: (image) => {
    const authUser = getAuthUser()
    authUser.profile_image = image

    window.localStorage.setItem('jwtToken', btoa(JSON.stringify(authUser)))
  }
}

function useAuth() {
  return {
    ...actions,
  }
}

export default useAuth