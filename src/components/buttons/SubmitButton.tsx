import { useState } from "react"
import { scroller } from "react-scroll"
import { useMyContext } from "../../contexts/MyContext"
import { Button, Alert, Box } from "@mui/material"
import { fetchDBUser } from "../../utils/dbClient"

import {
  sendICEContacts,
  sendHardware,
  sendPersonalDetails,
  sendGithub,
  changeCompletedStep,
} from "../../utils/dbClient"

type Props = {
  myIndex: number
  formData: any
  dataCy: string
  checked?: boolean
  stepName: string
  user?: any
  toggleAccordion?: () => void
}

function fixForm(formData: any) {
  let newData: any = {}
  newData.Name = formData.Name
  newData.Phone = formData.Phone
  newData.Address = {
    LineOne: formData.LineOne,
    LineTwo: formData.LineTwo,
    Zip: formData.Zip,
    City: formData.City,
    Region: formData.Region,
  }
  newData.Bank = {
    Clearing: formData.Clearing,
    Account: formData.Account,
  }
  newData.Allergies = formData.Allergies
  newData.OtherFoodPref = formData.OtherFoodPref
  return newData
}

export default function SubmitButton({
  myIndex,
  formData,
  dataCy,
  stepName,
  checked,
  user,
  toggleAccordion,
}: Props) {
  const [message, setMessage] = useState<any>(false)
  const { contextUser, userObj } = useMyContext()
  const isTest = process.env.REACT_APP_CYPRESSTEST

  const errorMessage =
    "Form failed to send. Please reset the form or reload the page and try again"

  function scrollDelay() {
    scroller.scrollTo("scroll" + myIndex, {
      duration: 1500,
      smooth: true,
    })
  }

  function submitAccepted() {
    increase()
    setChecked(stepName)
    setTimeout(() => {
      if (toggleAccordion) {
        toggleAccordion()
      }
      scrollDelay()
    }, 100)
    setMessage(false)
    changeCompletedStep(currentUserId, stepName)
  }

  const updateUser = async () => {
    try {
      const user = await fetchDBUser(userObj)
      console.log(user)
      let Form = new FormData()
      console.log("ContextUser", contextUser)
      Form.append("Name", contextUser.name)
      Form.append("PhoneNr", user.data.phone)
      Form.append("LineOne", user.data.address.lineOne)
      Form.append("LineTwo", user.data.address.lineTwo)
      Form.append("Zip", user.data.address.zip)
      Form.append("City", user.data.address.city)
      Form.append("Clearing", user.data.bank.clearing)
      Form.append("AccountNumber", user.data.bank.account)
      Form.append("Allergies", user.data.allergies)
      Form.append("OtherFoodPref", user.data.otherFoodPref)

      Form.append("Phone", user.requestedHardware.phone)
      Form.append("Headphones", user.requestedHardware.headphones)
      Form.append("Keyboard", user.requestedHardware.keyboard)
      Form.append("Mouse", user.requestedHardware.mouse)
      Form.append("Computer", user.requestedHardware.computer)
      Form.append("PCModel", user.requestedHardware.pcModel)
      Form.append("ComputerColor", user.requestedHardware.computerColor)
      Form.append("NewNumber", user.requestedHardware.newNumber)
      Form.append("CurrentNumber", user.requestedHardware.currentNumber)
      Form.append("ClothingSize", user.requestedHardware.clothingSize)

      Form.append("ICE-Name", user.iceContacts.name)
      Form.append("ICE-Relation", user.iceContacts.relation)
      Form.append("ICE-Number", user.iceContacts.phone)
      Form.append("ICE-Name2", user.iceContacts.name2)
      Form.append("ICE-Relation2", user.iceContacts.relation2)
      Form.append("ICE-Number2", user.iceContacts.phone2)

      Form.append("Created", contextUser.created)
      sendToSheets(
        "https://script.google.com/macros/s/AKfycbxpnrjJUzAqb8BhDgx3X1_h0XPo9dzbtXyosFINp9e1eV-KbtjzabSmRXglt8V8mllO/exec",
        Form
      )
    } catch (e) {
      console.error(e)
    }
  }

  function sendToSheets(URL: string, Form: any) {
    fetch(URL, { method: "POST", body: Form })
      .then((response) => console.log("Success!", response))
      .catch((error) => console.error("Error!", error.message))
  }

  function hardwareToSheets() {
    let Form = new FormData()
    Form.append("Name", contextUser.name)
    Form.append("Phone", formData.Phone)
    Form.append("Headphones", formData.Headphones)
    Form.append("Keyboard", formData.Keyboard)
    Form.append("Mouse", formData.Mouse)
    Form.append("Computer", formData.Computer)
    Form.append("PCModel", formData.PCModel)
    Form.append("ComputerColor", formData.ComputerColor)
    Form.append("NewNumber", formData.NewNumber)
    Form.append("CurrentNumber", formData.CurrentNumber)
    Form.append("ClothingSize", formData.ClothingSize)
    Form.append("Created", contextUser.created)
    sendToSheets(
      "https://script.google.com/macros/s/AKfycbxakf04n3BcpK_6c_z9bwnrC21oFxLClLgORjAe6ZaXXkW4bF2iOUZ1RlADH9R0k-RozA/exec",
      Form
    )
  }

  function verifyData(formData: any, dataCy: string, currentUserId: any) {
    switch (dataCy) {
      case "hardwareSubmit":
        if (formData.Computer === "PC" && formData.PCModel.length < 3) {
          setMessage("Please provide which PC you prefer ")
        } else {
          try {
            if (!isTest) {
              hardwareToSheets()
              sendHardware(currentUserId, formData)
            }
            submitAccepted()
          } catch (e: any) {
            console.error("Hardware Form: ", e.message)
            setMessage(errorMessage)
          }
        }
        break
      case "iceSubmit":
        if (
          formData.relation === "" ||
          formData.name === "" ||
          formData.phone === ""
        ) {
          setMessage(
            "Please provide at least one complete contact to complete this step"
          )
        } else {
          try {
            if (!isTest) {
              sendICEContacts(currentUserId, formData)
            }
            submitAccepted()
            setTimeout(updateUser, 7000)
          } catch (e: any) {
            console.error("ICEContact: ", e.message)
            setMessage(errorMessage)
          }
        }
        break
      case "personalSubmit":
        let missedFields = ""
        if (formData.Name === "") {
          missedFields += "Name, "
        }
        if (formData.Phone === "") {
          missedFields += "Phone-number, "
        }
        if (formData.LineOne === "") {
          missedFields += "Address, "
        }
        if (formData.Zip === "") {
          missedFields += "Zip, "
        }
        if (formData.City === "") {
          missedFields += "City, "
        }
        if (formData.Clearing === "") {
          missedFields += "Clearing number, "
        }
        if (formData.Account === "") {
          missedFields += "Account number, "
        }
        if (
          formData.Name === "" ||
          formData.Phone === "" ||
          formData.LineOne === "" ||
          formData.Zip === "" ||
          formData.City === "" ||
          formData.Account === "" ||
          formData.Clearing === ""
        ) {
          setMessage(
            `Please provide additional data: ${missedFields.slice(0, -2)}`
          )
        } else {
          try {
            if (!isTest) {
              sendPersonalDetails(currentUserId, fixForm(formData))
            }
            submitAccepted()
          } catch (e: any) {
            console.error("Personal Details: ", e.message)
            setMessage(errorMessage)
          }
        }
        break

      default:
        console.log("UNKNOWN ORIGIN, WHERE DO I SEND THIS FORM DATA?")
    }
  }

  const { increase, setChecked, checkedArray, currentUserId } = useMyContext()
  function submit() {
    switch (dataCy) {
      case "iceSubmit":
        verifyData(formData, dataCy, currentUserId)
        break
      case "hardwareSubmit":
        verifyData(formData, dataCy, currentUserId)
        break
      case "githubSubmit":
        try {
          sendGithub(currentUserId, formData)
          submitAccepted()
        } catch (e: any) {
          console.error("Github: ", e.message)
          setMessage(errorMessage)
        }
        break
      case "personalSubmit":
        verifyData(formData, dataCy, currentUserId)
        break
      default:
        console.log("UNKNOWN ORIGIN, WHERE DO I SEND THIS FORM DATA?")
    }
  }

  return (
    <>
      {message && <Alert severity="error">{message}</Alert>}
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: { textAlign: "center" },
        })}
      >
        <Button
          onClick={submit}
          variant="contained"
          size="medium"
          disabled={checkedArray.includes(stepName)}
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.main,
            fontWeight: "800",
            padding: "6px 26px",
            color: "#ffffff",
            margin: "6px",
            [theme.breakpoints.down("sm")]: {
              float: "unset",
              width: "30vw",
            },
            [theme.breakpoints.up("sm")]: {
              float: "right",
            },
          })}
          data-cy={dataCy}
        >
          SEND
        </Button>
      </Box>
    </>
  )
}
