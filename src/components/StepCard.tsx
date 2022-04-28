import React, { useState, cloneElement } from "react"
import { styled } from "@mui/system"
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import theme from "../theme"
import { Theme as MuiTheme } from "@mui/material/styles"
import CheckBoxIcon from "./icons/CheckBoxIcon"
import { Element } from "react-scroll"
import { User } from "../types"

import { OnboardingStatus } from "../types"

import { scroller } from "react-scroll"

type StepCardProps = {
  step: number
  stepName: string
  logo: string
  user: User | {}
  children: JSX.Element
  onboardingStatus: OnboardingStatus | {}
  title: string
  checked: boolean
  office: string | undefined
}
const LogoImage = styled("img")({
  [theme.breakpoints.up("lg")]: {
    width: "150px",
    height: "150px",
  },
  [theme.breakpoints.down("lg")]: {
    width: "100px",
    height: "100px",
  },
})
const cssTextOdd = {
  color: "#FFFFFF",
  bgcolor: (theme: MuiTheme) => theme.palette.primary.main,
} as const
const cssTextEven = {
  color: (theme: MuiTheme) => theme.palette.primary.main,
  bgcolor: "#FFFFFF",
} as const
const StepCard = ({
  step,
  logo,
  children,
  user,
  onboardingStatus,
  title,
  checked,
  office,
  stepName,
}: StepCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!checked)
  const MainBoxWidth: number = 70
  const MainBoxWidthLargerSr: number = 50
  const firstBox = {
    // padding: "1% 0%",
    textAlign: "center",
    alignSelf: "center",
    [theme.breakpoints.up("lg")]: {
      width: `calc((100% - ${MainBoxWidthLargerSr}% )/2)`,
    },
    [theme.breakpoints.down("lg")]: {
      width: `calc((100% - ${MainBoxWidth}% )/2)`,
    },
  } as const

  const toggleAccordion = () => {
    setIsOpen((open) => !open)
  }

  const scroll = () => {
    scroller.scrollTo("scroll" + (step + 1), {
      duration: 1500,
      smooth: true,
    })
  }

  if (stepName === "Slack Join") {
    children = cloneElement(children, {
      checked,
      onboardingStatus,
      stepName,
      user,
      toggleAccordion,
    })
  } else if (stepName === "Tools") {
    children = cloneElement(children, { office, stepName, toggleAccordion })
  } else if (["Github", "Hardware", "Contact", "Ice"].includes(stepName)) {
    children = cloneElement(children, {
      checked,
      stepName,
      user,
      toggleAccordion,
    })
  } else {
    children = cloneElement(children, { stepName, toggleAccordion })
  }

  return (
    <Element name={"scroll" + step}>
      <Accordion
        sx={{ boxShadow: "unset", borderTop: "none", borderBottom: "none" }}
        defaultExpanded={true}
        expanded={isOpen}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon htmlColor={"white"} />}
          aria-controls="panel-content"
          id="panel-header"
          sx={(theme) => ({
            backgroundColor: "#197ea0",
            [theme.breakpoints.down("sm")]: { padding: "0 10px" },
            padding: "0 120px",
          })}
          onClick={() => {
            toggleAccordion()
            scroll()
          }}
        >
          <Typography variant="h4" component="p" sx={{ color: "#ffffff" }}>
            {step + 1}. {title}
          </Typography>
          {checked && (
            <CheckBoxIcon sx={{ marginLeft: "auto", marginRight: "15px" }} />
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "unset" }}>
          <Box
            id={"step" + step}
            sx={[
              {
                display: "flex",
                width: "100vw",
                justifyContent: "space-evenly",
                columnGap: "0px",
                minHeight: "90vh",
                // pb: 10,
              },
              step % 2 === 0 ? { ...cssTextOdd } : { ...cssTextEven },
            ]}
          >
            <Box sx={firstBox}>
              {step % 2 === 0 ? (
                <Typography
                  sx={{
                    marginLeft: 3,
                    display: { xs: "none", sm: "inline", color: "white" },
                  }}
                  variant="step"
                >
                  {step + 1}
                </Typography>
              ) : (
                <LogoImage
                  sx={{
                    marginLeft: 3,
                    display: { xs: "none", sm: "inline" },
                  }}
                  src={logo}
                  alt="logo"
                ></LogoImage>
              )}
            </Box>
            <Box
              sx={{
                flexGrow: 4,
                padding: "2.5% 1%",
                maxWidth: {
                  md: MainBoxWidth + "%",
                  lg: MainBoxWidthLargerSr + "%",
                },
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 4,
                  width: "100%",
                }}
              >
                <Typography variant="h4" sx={{ marginRight: 2, flexGrow: 2 }}>
                  {title}
                </Typography>

                {window.innerWidth < 750 && (
                  <Typography
                    variant="h4"
                    sx={{
                      justifySelf: "flex-end",
                      flexGrow: 1,
                      marginLeft: 2,
                    }}
                  >
                    {step + 1}
                  </Typography>
                )}
              </Box>
              {children}
            </Box>
            <Box sx={firstBox}>
              {step % 2 === 0 ? (
                <LogoImage
                  sx={{
                    marginRight: 5,
                    display: { xs: "none", sm: "inline" },
                  }}
                  src={logo}
                  alt="logo"
                ></LogoImage>
              ) : (
                <Typography
                  sx={{
                    marginRight: 5,
                    display: { xs: "none", sm: "inline" },
                  }}
                  variant="step"
                  color="primary"
                >
                  {step + 1}
                </Typography>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Element>
  )
}
export default StepCard
