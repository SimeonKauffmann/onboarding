import React, { useReducer } from "react"
import { ProfileInfo } from "../../types"
import ProfileContactForm from "../forms/ProfileContactForm"
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { myProps } from "../../utils/mytypes"

const Profile = ({ myIndex, stepName, toggleAccordion }: myProps) => {
  const useProfileInfoReducer = () =>
    useReducer(
      (state: ProfileInfo, newState: Partial<ProfileInfo>) => {
        return { ...state, ...newState }
      },
      {
        Name: "",
        Phone: "",
        LineOne: "",
        LineTwo: "",
        Zip: "",
        City: "",
        Region: "",
        Clearing: "",
        Account: "",
        Allergies: "",
        OtherFoodPref: "",
      }
    )

  const [profileInfo, setProfileInfo] = useProfileInfoReducer()

  return (
    <>
      <Typography variant="h6" component="p" sx={{ pb: 5 }}>
        Lo and behold, another form 🧙
        <br />
        We require some additional information about you.
        <b>- Keep up the good work, half way there! </b>
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
            data-cy="openContactForm"
            variant="h5"
            component="p"
            sx={{ color: "#ffffff" }}
          >
            Contact Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProfileContactForm
            stepName={stepName}
            profileInfo={profileInfo}
            setProfileInfo={setProfileInfo}
            myIndex={myIndex}
            toggleAccordion={toggleAccordion}
          />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Profile
