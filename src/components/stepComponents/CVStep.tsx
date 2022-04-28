import React from "react"
import { Typography, Link } from "@mui/material"
import DoneButton from "../buttons/DoneButton"

interface Props {
  myIndex: number
  stepName: string
}

export default function CVStep(props: Props) {
  return (
    <div style={{ margin: "0", padding: "0" }}>
      <Typography variant="h6" component="p" sx={{ pb: 6 }}>
        Every employee has to have an updated CV. <br />
        Click on CV Details and then add Experiences and References which you
        can add to your CVs.
      </Typography>
      <Link
        variant="h4"
        color="inherit"
        rel="noopener noreferrer"
        target="_blank"
        href=""
      >
        Go to Tools
      </Link>
      <Typography variant="h6" component="p" sx={{ pt: 6 }}>
        Then you can click NEXT! 🤘
      </Typography>
      <DoneButton myIndex={props.myIndex} stepName={props.stepName} />
    </div>
  )
}
