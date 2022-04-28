import React, { useReducer } from "react"
import axios from "axios"
import data from "../testData"
import { User } from "../types"

const slackUrl = process.env.REACT_APP_DB_URL

const slackClient = axios.create({
  baseURL: slackUrl,
  timeout: 5000,
})

export const sendGithubHandleToSlack = async (user: string, formData: any) => {
  const response = await axios({
    method: "post",
    url: `${slackUrl}/`,
    data: {
      text: `Hi! can you add ${user} as a collaborator on Github. The username is ${formData.Username}`,
    },
  })

  console.log(response)
}

export const sendHardwareFormToSlack = async (user: string, formData: any) => {
  const response = await axios({
    method: "post",
    url: `${slackUrl}/`,
    data: {
      text: `Hi! ${user} would like to request the following hardware: 
    Phone: ${formData.Phone.length > 0 ? formData.Phone : "None"} 
    Phone Number: ${
      formData.CurrentNumber.length > 0 ? formData.CurrentNumber : "New Number"
    }
    Computer: ${formData.Computer}, ${
        formData.ComputerColor.length > 0
          ? formData.ComputerColor
          : formData.PCModel
      }
    Trackpad/Mouse: ${formData.Mouse.length > 0 ? formData.Mouse : "None"}
    Headphones: ${
      formData.Headphones.length > 0 ? formData.Headphones : "None"
    } 
    Keyboard: ${formData.Keyboard.length > 0 ? formData.Keyboard : "None"} 
    Clothing Size: ${
      formData.ClothingSize.length > 0 ? formData.ClothingSize : "Not Given"
    }
    `,
    },
  })

  console.log(response)
}
