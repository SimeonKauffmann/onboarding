import { useMyContext } from "../../contexts/MyContext"
import { Button, Box, Alert } from "@mui/material"
import { sendHardware, resetCompletedStep } from "../../utils/dbClient"
import { useState } from "react"

type Props = {
  dataCy: string
  stepName: string
}

export default function RegretButton({ dataCy, stepName }: Props) {
  const { decrease, unsetChecked, checkedArray, currentUserId, contextUser } =
    useMyContext()

  const [message, setMessage] = useState<any>(false)

  function submitAccepted() {
    decrease()
    unsetChecked(stepName)
    resetCompletedStep(currentUserId, stepName)
  }

  const emptyHardwareData = {
    Phone: "RESET",
    Headphones: " ",
    Keyboard: " ",
    Mouse: " ",
    Computer: " ",
    ComputerColor: " ",
    NewNumber: " ",
    CurrentNumber: " ",
    ClothingSize: " ",
    PCModel: " ",
  }
  function checkTimeLimit(data: any) {
    console.log("from time limit", data)
    let now = new Date()
    let oneWeekFromCreation
    if (data.requestedHardware.created !== undefined) {
      oneWeekFromCreation = new Date(data.requestedHardware.created)
    } else {
      oneWeekFromCreation = new Date()
    }
    oneWeekFromCreation.setDate(oneWeekFromCreation.getDate() + 7)
    if (oneWeekFromCreation > now) {
      setMessage("")
      return true
    } else if (data.requestedHardware.Phone === "RESET") {
      return true
    } else if (oneWeekFromCreation <= now) {
      setMessage(
        "It's more than one week since you ordered your gear, stuff is already on it's way"
      )
      return false
    }
  }

  function submit() {
    switch (dataCy) {
      case "iceSubmit":
        submitAccepted()
        console.log("im in ice submit")
        break
      case "hardwareSubmit":
        if (checkTimeLimit(contextUser)) {
          sendHardware(currentUserId, emptyHardwareData)
          submitAccepted()
        }
        break
      case "githubSubmit":
        submitAccepted()
        break
      case "personalSubmit":
        submitAccepted()
        break
      default:
        console.log("UNKNOWN ORIGIN, WHERE DO I SEND THIS FORM DATA?")
    }
  }

  return (
    <div>
      {message && <Alert severity="error">{message}</Alert>}
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: { textAlign: "center" },
        })}
      >
        {checkedArray.includes(stepName) && (
          <Button
            onClick={submit}
            variant="contained"
            size="medium"
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
            Reset
          </Button>
        )}
      </Box>
    </div>
  )
}
