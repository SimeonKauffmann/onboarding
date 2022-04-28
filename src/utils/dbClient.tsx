import axios, { AxiosRequestConfig } from "axios"
import data from "../testData"
import { User } from "../types"
import { getToken, user, verifyTokenExpireTime } from "./httpClient"
import axiosRetry from "axios-retry"

const dbUrl = process.env.REACT_APP_DB_URL

const dbClient = axios.create({
  baseURL: dbUrl,
  timeout: 10000,
})

axiosRetry(dbClient, { retries: 3 })

const addTokenToRequest = async (config: AxiosRequestConfig) => {
  await verifyTokenExpireTime()
  const token = getToken()
  if (token && config.headers) {
    config.headers["Authorization"] = "Bearer " + token
    config.headers["Office"] = Object.keys(user.EmployeeIds)[0]
  }

  return config
}

dbClient.interceptors.request.use(addTokenToRequest, (error) => {
  Promise.reject(error)
})
export const fetchDBUser = async (user: User) => {
  const response = await dbClient.get(`api/user?id=${user.Id}`)

  let dbUser = response.data

  if (dbUser) return dbUser

  dbUser = {
    Created: new Date(),
    UserId: user.Id,
    Name: user.Name,
    CompletedSteps: data.map((data) => ({
      StepName: data.name,
      Completed: false,
    })),
  }

  try {
    const newResponse = await dbClient.post("api/user", dbUser)

    dbUser = newResponse.data
    return dbUser
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const sendICEContacts = async (user: string, iceForm: any) => {
  const response = await dbClient.put(`api/icecontact?id=${user}`, iceForm)
  return response.data
}

export const sendHardware = async (user: string, hardwareForm: any) => {
  const response = await dbClient.put(
    `api/hardwareform?id=${user}`,
    hardwareForm
  )
  return response.data
}

export const sendGithub = async (user: string, githubForm: any) => {
  const response = await dbClient.put(`api/github?id=${user}`, githubForm)

  return response.data
}

export const sendPersonalDetails = async (user: string, contactForm: any) => {
  const response = await dbClient.put(
    `api/personaldetails?id=${user}`,
    contactForm
  )
  return response.data
}

export const changeCompletedStep = async (userid: string, stepName: string) => {
  const response = await dbClient.put(`api/completedsteps?id=${userid}`, {
    StepName: stepName,
    Completed: true,
  })
  return response.data
}

export const resetCompletedStep = async (userid: string, stepName: string) => {
  const response = await dbClient.put(`api/completedsteps?id=${userid}`, {
    StepName: stepName,
    Completed: false,
  })
  return response.data
}
