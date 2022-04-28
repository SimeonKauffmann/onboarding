import {
  Button,
  Link,
  Box,
  Typography,
  CardMedia,
  Switch,
  Stack,
} from "@mui/material"
import React, { useState, useEffect } from "react"
import { myProps } from "../../utils/mytypes"
import DoneButton from "../buttons/DoneButton"

const Playbook = ({ myIndex, stepName, toggleAccordion }: myProps) => {
  const [iframeWidth, setIframeWidth] = useState("100%")
  const [language, setLanguage] = useState<boolean>(false)
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 750) {
        setIframeWidth("100vw")
      } else if (window.innerWidth > 750) {
        setIframeWidth("800px")
      }
    })
  }, [])

  useEffect(() => {
    if (window.innerWidth < 900) {
      setIframeWidth("100vw")
    } else {
      setIframeWidth("800px")
    }
  }, [])

  function languageToggle() {
    setLanguage((language) => !language)
  }
  return (
    <div
      style={{
        marginLeft: "0",
        marginRight: "0",
        paddingLeft: "0",
        paddingRight: "0",
      }}
    >
      <Typography variant="h6" component="p" sx={{ pb: 2 }}>
        Lets start with our playbook!
        <br />
        It tells you a bit about our values and drivers, how we play here 🏄🏻‍♂️
      </Typography>
      <Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>SV</Typography>
          <Switch
            checked={language}
            onChange={languageToggle}
            color="default"
          />
          <Typography>EN</Typography>
        </Stack>
      </Box>
      <CardMedia
        title="googleDocs"
        sx={{ height: "60vh", width: iframeWidth }}
        component="iframe"
        src={language ? "" : ""}
      ></CardMedia>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: { textAlign: "center" },
        })}
      >
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={language ? "" : ""}
        >
          <Button
            variant="contained"
            size="medium"
            sx={[
              (theme) => ({
                backgroundColor: "white",
                fontWeight: "800",
                padding: "6px 26px ",
                margin: "6px auto",
                marginLeft: "10px",
                color: theme.palette.primary.dark,
                float: "left",
                [theme.breakpoints.down("sm")]: { float: "unset" },
              }),
              (theme) => ({
                "&:hover": {
                  color: "white",
                },
              }),
            ]}
          >
            Open in Google Docs
          </Button>
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={language ? "" : ""}
        >
          <Button
            variant="contained"
            size="medium"
            sx={[
              (theme) => ({
                backgroundColor: "white",
                fontWeight: "800",
                padding: "6px 26px ",
                margin: "6px auto",
                marginLeft: "10px",
                color: theme.palette.primary.dark,
                float: "left",
                [theme.breakpoints.down("sm")]: { float: "unset" },
              }),
              (theme) => ({
                "&:hover": {
                  color: "white",
                },
              }),
            ]}
          >
            Download PDF
          </Button>
        </Link>
      </Box>
      <DoneButton
        myIndex={myIndex}
        stepName={stepName}
        dataCy="playbookNext"
        toggleAccordion={toggleAccordion}
      />
    </div>
  )
}
export default Playbook
