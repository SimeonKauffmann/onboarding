import React from "react"
import { Button, Box } from "@mui/material"
import { useMyContext } from "../../contexts/MyContext"
import { scroller } from "react-scroll"
import { changeCompletedStep } from "../../utils/dbClient"

type Props = {
  myIndex: number
  stepName: string
  text?: string
  checked?: boolean
  secondary?: boolean
  link?: string
  disabled?: boolean
  dataCy?: string
  toggleAccordion?: () => void
}

export default function DoneButton({
  myIndex,
  stepName,
  text,
  checked,
  secondary,
  link,
  disabled,
  dataCy,
  toggleAccordion,
}: Props) {
  const { increase, setChecked, checkedArray, currentUserId } = useMyContext()

  function scrollDelay() {
    if (toggleAccordion) {
      toggleAccordion()
    }
    scroller.scrollTo("scroll" + myIndex, {
      duration: 1500,
      smooth: true,
      delay: 500,
    })
  }
  function submit() {
    increase()
    setChecked(stepName)
    changeCompletedStep(currentUserId, stepName)
    setTimeout(() => {
      scrollDelay()
    }, 500)
  }

  const primaryTheme = (theme: any) => ({
    backgroundColor: theme.palette.secondary.main,
    fontWeight: "800",
    padding: "6px 26px ",
    margin: " 6px",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      float: "unset",
      width: "30vw",
    },
    [theme.breakpoints.up("sm")]: {
      float: "right",
    },
  })

  const secondaryTheme = [
    (theme: any) => ({
      backgroundColor: "white",
      fontWeight: "800",
      padding: "6px 26px ",
      margin: " 6px",
      color: theme.palette.primary.dark,
      [theme.breakpoints.down("sm")]: {
        float: "unset",
        width: "30vw",
      },
      [theme.breakpoints.up("sm")]: {
        float: "right",
      },
    }),
    (theme: any) => ({
      "&:hover": {
        color: "white",
      },
    }),
  ]

  function checkDisabled() {
    if (disabled === false) return false
    if (checked || checkedArray.includes(stepName)) return true
  }

  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: { textAlign: "center" },
      })}
    >
      {link ? (
        <Button
          rel="noopener noreferrer"
          target="_blank"
          onClick={submit}
          variant="contained"
          size="medium"
          disabled={checkDisabled()}
          sx={secondary ? secondaryTheme : primaryTheme}
          data-cy={dataCy ? dataCy : "doneBtn"}
          href={link}
        >
          {text ? text : "NEXT"}
        </Button>
      ) : (
        // <Link to={"scroll" + (myIndex + 1)} duration={1000} smooth={true}>
        <Button
          onClick={submit}
          variant="contained"
          size="medium"
          disabled={checkDisabled()}
          sx={secondary ? secondaryTheme : primaryTheme}
          data-cy={dataCy ? dataCy : "doneBtn"}
        >
          {text ? text : "NEXT"}
        </Button>
        // </Link>
      )}
    </Box>
  )
}
