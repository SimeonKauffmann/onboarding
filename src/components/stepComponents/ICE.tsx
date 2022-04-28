import { Typography } from "@mui/material"
import { useReducer } from "react"
import IceContactForm from "../forms/IceContactForm"
import { myProps } from "../../utils/mytypes"
import { IceContact } from "../../types"

const ICE = ({ myIndex, stepName, toggleAccordion }: myProps) => {
  const useIceContactReducer = () =>
    useReducer(
      (state: IceContact, newState: Partial<IceContact>) => {
        return { ...state, ...newState }
      },
      {
        relation: "",
        name: "",
        phone: "",
        relation2: "",
        name2: "",
        phone2: "",
      }
    )

  const [iceContact, setIceContact] = useIceContactReducer()

  return (
    <>
      <Typography variant="h6" component="p" sx={{ pb: 2 }}>
        We would like to collect the contact information of one or two people
        that we should contact in case of an emergency that involves you.
      </Typography>

      <IceContactForm
        stepName={stepName}
        iceContact={iceContact}
        setIceContact={setIceContact}
        myIndex={myIndex}
        toggleAccordion={toggleAccordion}
      />
    </>
  )
}

export default ICE
