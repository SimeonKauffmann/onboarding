import axios, { AxiosRequestConfig } from "axios"
import {
  startToken,
  expireTimeLocalStorageItem,
  authTokenLocalStorageItem,
} from "./constants"
import { Token, User } from "../types"
import { isEmpty } from "lodash"

export let user: User | { EmployeeIds: any } = { EmployeeIds: {} }

const apiUrl = process.env.REACT_APP_API_URL

let token = startToken

const httpClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
})

export default httpClient

export const getToken = () => {
  return !!localStorage.getItem(authTokenLocalStorageItem)
    ? localStorage.getItem(authTokenLocalStorageItem)
    : token
}

const getExpireTime = () => {
  return !!localStorage.getItem(expireTimeLocalStorageItem)
    ? localStorage.getItem(expireTimeLocalStorageItem)
    : 0
}

const setToken = (_token: Token) => {
  token = _token
  localStorage.setItem(authTokenLocalStorageItem, token.AccessToken)
  localStorage.setItem(expireTimeLocalStorageItem, token.ExpiresAt)

  const addTokenToRequest = (config: AxiosRequestConfig) => {
    if (token.AccessToken && config.headers) {
      config.headers["Authorization"] = "Bearer " + token.AccessToken
    }
    if (!isEmpty(user.EmployeeIds) && config.headers) {
      config.headers["Office"] = Object.keys(user.EmployeeIds)[0]
    }
    return config
  }

  httpClient.interceptors.request.use(addTokenToRequest, (error) => {
    Promise.reject(error)
  })
}

export const verifyTokenExpireTime = async () => {
  const expiresAt = getExpireTime()
  if (!!expiresAt) {
    const now = new Date()
    const expiresAtDate = new Date(new Date(expiresAt).getTime() - 5 * 60000)
    if (expiresAtDate <= now) {
      const didRefresh = await refreshToken()
      return didRefresh
    }
  }
}

export const removeToken = () => {
  token = startToken
  localStorage.clear()
}

httpClient.interceptors.request.use(async (response) => {
  await verifyTokenExpireTime()
  return response
})

export const refreshToken = async () => {
  try {
    // not using httpClient to avoid using verifyTokenExpireTime() when refreshing
    const response = await axios.post(`${apiUrl}/api/login/refresh`, {
      token: getToken(),
    })
    setToken(response.data)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const login = async (loginObj: {
  Email: null | string
  GoogleToken: string
}) => {
  try {
    const response = await httpClient.post(`api/login`, loginObj)
    setToken(response.data)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const fetchUser = async () => {
  const response = await httpClient.get("api/user/me")
  user = response.data

  const token = getToken()
  if (
    token &&
    typeof token === "object" &&
    "AccessToken" in token &&
    "ExpiresAt" in token
  ) {
    setToken(token)
  }

  return response.data
}

export const fetchOnboardingStatus = async () => {
  const response = await httpClient.get("api/onboarding/status")
  return response.data
}

setInterval(() => {
  refreshToken()
}, 12 * 60 * 1000)
