import React, { useReducer } from "react"

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { HardwareChoices } from "../../types"
import HardwareContactForm from "../forms/HardwareContactForm"
import { User } from "../../types"

interface HardwareProps {
  myIndex: number
  stepName: string
  user: User | {}
  toggleAccordion: () => void
}

const Hardware = ({
  myIndex,
  stepName,
  user,
  toggleAccordion,
}: HardwareProps) => {
  const useHardwareChoiceReducer = () =>
    useReducer(
      (state: HardwareChoices, newState: Partial<HardwareChoices>) => {
        return { ...state, ...newState }
      },
      {
        Phone: "",
        Headphones: "",
        Keyboard: "",
        Mouse: "",
        Computer: "",
        ComputerColor: "",
        NewNumber: "",
        CurrentNumber: "",
        ClothingSize: "",
        PCModel: "",
      }
    )

  const [hardwareChoices, setHardwareChoices] = useHardwareChoiceReducer()

  return (
    <>
      <Typography variant="h6" component="p" sx={{ pb: 5 }}>
        Friend, let's order some work gear for you.
        <br />
        <br />
        You may choose any phone and laptop you prefer. Then select your
        equipment for a total maximum of <b> 6500 sek</b>.
        <br />
        <br />
        Attach the item's prisjakt-URL in the designated input field.
      </Typography>

      <Accordion
        sx={{ boxShadow: "unset", borderTop: "none", borderBottom: "none" }}
        expanded={true}
      >
        <AccordionSummary
          aria-controls="panel-content"
          id="panel-header"
          sx={{ backgroundColor: "#197ea0" }}
        >
          <Typography
            data-cy="SelectHardware"
            variant="h5"
            component="p"
            sx={{ color: "#ffffff" }}
          >
            Select Gear
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HardwareContactForm
            stepName={stepName}
            hardwareChoices={hardwareChoices}
            setHardwareChoices={setHardwareChoices}
            myIndex={myIndex}
            user={user}
            toggleAccordion={toggleAccordion}
          />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Hardware
