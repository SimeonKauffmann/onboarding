import React from "react"
import type { GithubType } from "../stepComponents/Github"
import { FormControl, InputLabel, FilledInput } from "@mui/material"

import SubmitButton from "../buttons/SubmitButton"
import DoneButton from "../buttons/DoneButton"
import { User } from "../../types"
import RegretButton from "../buttons/RegretButton"

interface Props {
  username: GithubType
  setGithubUser: (profileInfo: Partial<GithubType>) => void
  myIndex: number
  stepName: string
  user: User | {}
  toggleAccordion: () => void
}

export default function GithubForm({
  username,
  setGithubUser,
  myIndex,
  stepName,
  user,
  toggleAccordion,
}: Props) {
  let formSetting = (theme: any) => ({
    border: "none",
    background: "#ffffff",
    borderRadius: "20px",
    margin: "10px",
    [theme.breakpoints.down("sm")]: { width: "80vw" },
    [theme.breakpoints.up("sm")]: { width: "30vw" },
    [theme.breakpoints.up("lg")]: { width: "18vw" },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUser({ [event.target.name]: event.target.value })
  }

  return (
    <div data-cy="githubForm">
      <FormControl sx={formSetting} variant="filled">
        <InputLabel htmlFor="filled-adornment-phone" sx={{ color: "#007096" }}>
          Github handle
        </InputLabel>
        <FilledInput
          style={{ width: "100%" }}
          type="text"
          disableUnderline={true}
          name="Username"
          data-cy="githubName"
          value={username.Username}
          onChange={handleInputChange}
        />
      </FormControl>

      <SubmitButton
        stepName={stepName}
        myIndex={myIndex}
        formData={username}
        dataCy="githubSubmit"
        user={user}
        toggleAccordion={toggleAccordion}
      />
      <DoneButton
        stepName={stepName}
        myIndex={myIndex}
        text={"Skip"}
        dataCy="githubSkip"
        toggleAccordion={toggleAccordion}
        secondary
      />
      <RegretButton stepName={stepName} dataCy="hardwareSubmit" />
    </div>
  )
}
