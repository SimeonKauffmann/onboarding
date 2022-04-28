import React from "react"
import { ProfileInfo } from "../../types"
import {
  FormControl,
  InputLabel,
  FilledInput,
  styled,
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material"
import { useMyContext } from "../../contexts/MyContext"
import RegretButton from "../buttons/RegretButton"
import SubmitButton from "../buttons/SubmitButton"

const CustomizedFilledInput = styled(FilledInput)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: { width: "80vw" },
  [theme.breakpoints.up("sm")]: { width: "30vw" },
  [theme.breakpoints.up("lg")]: { width: "18vw" },
}))

type ProfileInfoPropType = {
  profileInfo: ProfileInfo
  setProfileInfo: (profileInfo: Partial<ProfileInfo>) => void
  myIndex: number
  stepName: string
  toggleAccordion: () => void
}

const ProfileContactForm = ({
  profileInfo,
  setProfileInfo,
  myIndex,
  stepName,
  toggleAccordion,
}: ProfileInfoPropType) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({ [event.target.name]: event.target.value })
  }

  const [open, setOpen] = React.useState(false)
  const { increase } = useMyContext()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    increase()

    setOpen(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
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
      data-cy="ProfileContactForm"
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
        <Typography sx={{ marginLeft: "10px" }}>* Required</Typography>
        <Grid
          sx={{
            paddingBottom: "1.5vh",
          }}
          container
          spacing={{ xs: 2, sm: 3 }}
        >
          <Grid item xs={12} sm={6}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-phone"
                sx={{ color: "#007096" }}
              >
                First and last name
              </InputLabel>
              <CustomizedFilledInput
                required
                name="Name"
                disableUnderline={true}
                id="filled-adornment-phone"
                value={profileInfo.Name}
                onChange={handleInputChange}
                data-cy="nameInput"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-headphones"
                sx={{ color: "#007096" }}
              >
                Phone-number
              </InputLabel>
              <CustomizedFilledInput
                required
                name="Phone"
                disableUnderline={true}
                id="filled-adornment-phone"
                value={profileInfo.Phone}
                onChange={handleInputChange}
                data-cy="phoneInput"
                inputProps={{
                  pattern: "[+]?[0-9]{2,3}-?[0-9]{7,}",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-keyboard"
                sx={{ color: "#007096" }}
              >
                Address
              </InputLabel>
              <CustomizedFilledInput
                required
                name="LineOne"
                disableUnderline={true}
                id="filled-adornment-phone"
                value={profileInfo.LineOne}
                onChange={handleInputChange}
                data-cy="addressInput"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-address2"
                sx={{ color: "#007096" }}
              >
                Address 2
              </InputLabel>
              <CustomizedFilledInput
                name="LineTwo"
                disableUnderline={true}
                id="filled-adornment-phone"
                value={profileInfo.LineTwo}
                onChange={handleInputChange}
                data-cy="address2Input"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-mouse"
                sx={{ color: "#007096" }}
              >
                Zip code
              </InputLabel>
              <CustomizedFilledInput
                required
                name="Zip"
                disableUnderline={true}
                id="filled-adornment-phone"
                value={profileInfo.Zip}
                onChange={handleInputChange}
                data-cy="zipInput"
                inputProps={{
                  pattern: "[0-9]{3}-? ?[0-9]{2}",
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-keyboard"
                sx={{ color: "#007096" }}
              >
                City
              </InputLabel>
              <CustomizedFilledInput
                required
                name="City"
                disableUnderline={true}
                id="filled-adornment-city"
                value={profileInfo.City}
                onChange={handleInputChange}
                data-cy="cityInput"
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={6}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-mouse"
                sx={{ color: "#007096" }}
              >
                Clearing number
              </InputLabel>
              <CustomizedFilledInput
                required
                name="Clearing"
                disableUnderline={true}
                id="filled-adornment-phone"
                value={profileInfo.Clearing}
                onChange={handleInputChange}
                data-cy="clearingInput"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required={true} sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-mouse"
                sx={{ color: "#007096" }}
              >
                Account number
              </InputLabel>
              <CustomizedFilledInput
                required
                name="Account"
                disableUnderline={true}
                id="filled-adornment-phone"
                value={profileInfo.Account}
                onChange={handleInputChange}
                data-cy="accountInput"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-allergies"
                sx={{ color: "#007096" }}
              >
                Any allergies? Write them here..
              </InputLabel>
              <CustomizedFilledInput
                required
                name="Allergies"
                disableUnderline={true}
                id="filled-adornment-allergies"
                value={profileInfo.Allergies}
                onChange={handleInputChange}
                data-cy="allergiesInput"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={formSetting} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-allergies"
                sx={{ color: "#007096" }}
              >
                Other preferences? Vegan, carnivore..
              </InputLabel>
              <CustomizedFilledInput
                required
                name="OtherFoodPref"
                disableUnderline={true}
                id="filled-adornment-otherFoodPref"
                value={profileInfo.OtherFoodPref}
                onChange={handleInputChange}
                data-cy="otherFoodPrefInput"
              />
            </FormControl>
          </Grid>
        </Grid>

        <SubmitButton
          myIndex={myIndex}
          formData={profileInfo}
          dataCy="personalSubmit"
          stepName={stepName}
          toggleAccordion={toggleAccordion}
        />
        <RegretButton stepName={stepName} dataCy="hardwareSubmit" />

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              You have successfully submitted your Contacts form!
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </form>
  )
}

export default ProfileContactForm
