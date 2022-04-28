import React from "react"
import { IceContact } from "../../types"
import {
  FormControl,
  InputLabel,
  FilledInput,
  styled,
  Box,
  Typography,
  Grid,
} from "@mui/material"
import SubmitButton from "../buttons/SubmitButton"
import RegretButton from "../buttons/RegretButton"

const CustomizedFilledInput = styled(FilledInput)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: { width: "80vw" },
  [theme.breakpoints.up("sm")]: { width: "20vw" },
  [theme.breakpoints.up("lg")]: { width: "15vw" },
}))

type IceContactPropType = {
  iceContact: IceContact
  setIceContact: (profileInfo: Partial<IceContact>) => void
  myIndex: number
  stepName: string
  toggleAccordion: () => void
}

const IceContactForm = ({
  iceContact,
  setIceContact,
  myIndex,
  stepName,
  toggleAccordion,
}: IceContactPropType) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIceContact({ [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  let formSetting = {
    border: "none",
    background: "#ffffff",
    borderRadius: "20px",
    margin: "10px",
  }

  return (
    <form
      style={{ paddingBottom: "5vh" }}
      data-cy="IceContactForm"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          pt: "24px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          <b> Person 1 </b>
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={4}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-name"
                sx={{ color: "#007096" }}
              >
                First and last name
              </InputLabel>
              <CustomizedFilledInput
                required
                name="name"
                disableUnderline={true}
                id="filled-adornment-name"
                value={iceContact.name}
                onChange={handleInputChange}
                data-cy="iceName"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-relation"
                sx={{ color: "#007096" }}
              >
                Relation
              </InputLabel>
              <CustomizedFilledInput
                required
                name="relation"
                disableUnderline={true}
                id="filled-adornment-relation"
                value={iceContact.relation}
                onChange={handleInputChange}
                data-cy="iceRelation"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-number"
                sx={{ color: "#007096" }}
              >
                Phone Number
              </InputLabel>
              <CustomizedFilledInput
                required
                name="phone"
                disableUnderline={true}
                id="filled-adornment-number"
                value={iceContact.phone}
                onChange={handleInputChange}
                data-cy="iceNumber"
                inputProps={{
                  pattern: "[+]?[0-9]{2,3}-?[0-9]{7,}",
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Typography>
          <b> Person 2 </b> (optional)
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={4}>
            <FormControl sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-name"
                sx={{ color: "#007096" }}
              >
                First and last name
              </InputLabel>
              <CustomizedFilledInput
                required
                name="name2"
                disableUnderline={true}
                id="filled-adornment-name"
                value={iceContact.name2}
                onChange={handleInputChange}
                data-cy="iceName2"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-relation"
                sx={{ color: "#007096" }}
              >
                Relation
              </InputLabel>
              <CustomizedFilledInput
                required
                name="relation2"
                disableUnderline={true}
                id="filled-adornment-relation"
                value={iceContact.relation2}
                onChange={handleInputChange}
                data-cy="iceRelation2"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-number"
                sx={{ color: "#007096" }}
              >
                Phone Number
              </InputLabel>
              <CustomizedFilledInput
                required
                name="phone2"
                disableUnderline={true}
                id="filled-adornment-number"
                value={iceContact.phone2}
                onChange={handleInputChange}
                data-cy="iceNumber2"
                inputProps={{
                  pattern: "[+]?[0-9]{2,3}-?[0-9]{7,}",
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <SubmitButton
          myIndex={myIndex}
          formData={iceContact}
          dataCy="iceSubmit"
          stepName={stepName}
          toggleAccordion={toggleAccordion}
        />
        <RegretButton stepName={stepName} dataCy="iceSubmit" />
      </Box>
    </form>
  )
}

export default IceContactForm
