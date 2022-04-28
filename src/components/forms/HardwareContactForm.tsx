import React, { useState, useEffect } from "react"
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  styled,
  FilledInput,
  TextField,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material"
import { HardwareChoices } from "../../types"
import { useMyContext } from "../../contexts/MyContext"
import SubmitButton from "../buttons/SubmitButton"
import { User } from "../../types"
import RegretButton from "../buttons/RegretButton"

const CustomizedTextfield = styled(TextField)`
  root {
    border: "none";
  }
`
const CustomizedFilledInput = styled(FilledInput)`
  root {
    border: "none";
  }
`

const formSx = {
  border: "none",
  background: "#ffffff",
  borderRadius: "20px",
  width: "90%",
  marginBottom: "2vh",
}

const typoSx = {
  pt: 3,
  pb: 1,
}

const laptop = [
  {
    value: 'Macbook pro 14"',
    label: 'Macbook Pro 14"',
  },
  {
    value: 'Macbook Pro 16"',
    label: 'Macbook Pro 16"',
  },
  {
    value: "PC",
    label: "Windows PC",
  },
  {
    value: "No laptop",
    label: "No laptop",
  },
]

const phoneNumberChoice = [
  {
    value: "Keep",
    label: "Keep phone number",
  },
  {
    value: "New phone number",
    label: "Get new phone number",
  },
]

const computerColor = [
  {
    value: "Silver",
    label: "Silver",
  },
  {
    value: "Space grey",
    label: "Space grey",
  },
]

const size = [
  {
    value: "XS",
    label: "XS",
  },
  {
    value: "S",
    label: "S",
  },
  {
    value: "M",
    label: "M",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: "XL",
    label: "XL",
  },
  {
    value: "XXL",
    label: "XXL",
  },
]

type HardwareFormPropType = {
  hardwareChoices: HardwareChoices
  setHardwareChoices: (hardwareChoices: Partial<HardwareChoices>) => void
  myIndex: number
  stepName: string
  user: User | {}
  toggleAccordion: () => void
}

const HardwareContactForm = ({
  hardwareChoices,
  setHardwareChoices,
  myIndex,
  stepName,
  user,
  toggleAccordion,
}: HardwareFormPropType) => {
  const [open, setOpen] = useState(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHardwareChoices({ [event.target.name]: event.target.value })
  }
  const { increase } = useMyContext()

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 750) {
        setIsMobile(true)
      } else if (window.innerWidth > 750) {
        setIsMobile(false)
      }
    })
  }, [])

  useEffect(() => {
    if (window.innerWidth < 750) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

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

  const hardwareOptions = [
    {
      label: "Enter the phone that you want",
      dataCy: "phone",
      value: hardwareChoices.Phone,
      name: "Phone",
      id: "filled-adornment-phone",
    },
    {
      label: "Headphones (Prisjakt URL)",
      dataCy: "headphones",
      value: hardwareChoices.Headphones,
      name: "Headphones",
      id: "filled-adornment-headphones",
    },
    {
      label: "Keyboard (Prisjakt URL)",
      dataCy: "keyboard",
      value: hardwareChoices.Keyboard,
      name: "Keyboard",
      id: "filled-adornment-keyboard",
    },
    {
      label: "Trackpad/ mouse (Prisjakt URL)",
      dataCy: "trackpad",
      value: hardwareChoices.Mouse,
      name: "Mouse",
      id: "filled-adornment-mouse",
    },
  ]

  return (
    <form
      style={{ paddingBottom: "5vh" }}
      data-cy="HardwareContactForm"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          pt: "24px",
          pb: "3vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {hardwareOptions.map((step, index) => (
            <Grid key={"key" + index} item xs={12} sm={6}>
              <FormControl sx={formSx} variant="filled">
                <InputLabel htmlFor={step.id} sx={{ color: "#007096" }}>
                  {step.label}
                </InputLabel>
                <CustomizedFilledInput
                  data-cy={step.name}
                  disableUnderline={true}
                  id={step.id}
                  defaultValue={step.value}
                  name={step.name}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
          ))}
        </Grid>

        <div>
          <Box
            component="span"
            sx={{
              "& .MuiTextField-root": {
                width: "90%",
                background: "#ffffff",
                borderRadius: "20px",
                margin: "auto",

                justifyContent: "center",
              },
            }}
          >
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} sm={6}>
                <Typography sx={typoSx}>Select laptop</Typography>
                <CustomizedTextfield
                  data-cy="macBtn"
                  variant="standard"
                  id="outlined-select-laptop"
                  select
                  value={hardwareChoices.Computer}
                  onChange={handleInputChange}
                  name="Computer"
                >
                  {laptop.map((option: any) => (
                    <MenuItem
                      data-cy="menuItem"
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomizedTextfield>
              </Grid>
              <Grid item xs={12} sm={6}>
                {hardwareChoices.Computer === "PC" ? (
                  <FormControl sx={formSx} variant="filled">
                    <InputLabel
                      htmlFor="filled-adornment-number"
                      sx={{ color: "#007096" }}
                    >
                      Enter PC model (Prisjakt URL)
                    </InputLabel>
                    <CustomizedFilledInput
                      required
                      id="outline-select-pc-model"
                      value={hardwareChoices.PCModel}
                      onChange={handleInputChange}
                      name="PCModel"
                    />
                  </FormControl>
                ) : (
                  <div>
                    <Typography sx={typoSx}>Select laptop color</Typography>
                    <CustomizedTextfield
                      variant="standard"
                      id="outlined-select-laptop-color"
                      select
                      value={hardwareChoices.ComputerColor}
                      onChange={handleInputChange}
                      name="ComputerColor"
                      sx={{ border: "none" }}
                    >
                      {computerColor.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomizedTextfield>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={typoSx}>Keep or get new number</Typography>
                <CustomizedTextfield
                  variant="standard"
                  id="outlined-select-number"
                  select
                  value={hardwareChoices.NewNumber}
                  onChange={handleInputChange}
                  name="NewNumber"
                  sx={{ border: "none" }}
                >
                  {phoneNumberChoice.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomizedTextfield>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={6}>
                  {isMobile && (
                    <>
                      {hardwareChoices.NewNumber === "Keep" && (
                        <div>
                          <Typography sx={{ pt: 2, pb: 1 }}></Typography>
                          <FormControl sx={formSx} variant="filled">
                            <InputLabel
                              htmlFor="filled-adornment-number"
                              sx={{ color: "#007096" }}
                            >
                              Enter your phone number
                            </InputLabel>
                            <CustomizedFilledInput
                              required
                              id="filled-adornment-number"
                              value={hardwareChoices.CurrentNumber}
                              onChange={handleInputChange}
                              name="CurrentNumber"
                              type="tel"
                              inputProps={{
                                pattern: "[+]?[0-9]{2,3}-?[0-9]{7,}",
                              }}
                            />
                          </FormControl>
                        </div>
                      )}
                    </>
                  )}
                  <Typography sx={typoSx}>Prefered clothing size</Typography>
                  <CustomizedTextfield
                    variant="standard"
                    id="outlined-select-laptop-color"
                    select
                    value={hardwareChoices.ClothingSize}
                    onChange={handleInputChange}
                    name="ClothingSize"
                    sx={{ border: "none" }}
                  >
                    {size.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomizedTextfield>
                </Grid>
              </Grid>
              {!isMobile && (
                <Grid item xs={12} sm={6}>
                  {hardwareChoices.NewNumber === "Keep" && (
                    <div>
                      <Typography sx={{ pt: 2, pb: 1 }}></Typography>
                      <FormControl sx={formSx} variant="filled">
                        <InputLabel
                          htmlFor="filled-adornment-number"
                          sx={{ color: "#007096" }}
                        >
                          Enter your phone number
                        </InputLabel>
                        <CustomizedFilledInput
                          required
                          id="filled-adornment-number"
                          value={hardwareChoices.CurrentNumber}
                          onChange={handleInputChange}
                          name="CurrentNumber"
                          type="tel"
                          inputProps={{
                            pattern: "[+]?[0-9]{2,3}-?[0-9]{7,}",
                          }}
                        />
                      </FormControl>
                    </div>
                  )}
                </Grid>
              )}
            </Grid>
          </Box>
        </div>
      </Box>

      <RegretButton stepName={stepName} dataCy="hardwareSubmit" />

      <SubmitButton
        myIndex={myIndex}
        formData={hardwareChoices}
        stepName={stepName}
        dataCy="hardwareSubmit"
        user={user}
        toggleAccordion={toggleAccordion}
      />
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
            You have successfully submitted your Hardware form!
          </Alert>
        </Snackbar>
      </Stack>
    </form>
  )
}

export default HardwareContactForm
