import {
  Link,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material"
import React from "react"
import DoneButton from "../buttons/DoneButton"

interface Props {
  myIndex: number
  office: string | undefined
  stepName: string
  toggleAccordion: () => void
}

const Tools = (props: Props) => {
  return (
    <div style={{ margin: "0", padding: "0" }}>
      <Typography variant="h6" component="p" sx={{ pb: 6 }}>
        Visit and explore the Tools. There you'll be reporting your hours,
        applying for vacation, VAB, CV and find other important information.
      </Typography>
      <br />
      <List>
        <ListItem sx={{ padding: "0px 16px" }}>
          <ListItemText
            primary={
              <Box sx={{ display: "flex" }}>
                <Typography variant="body1" component="p" sx={{ pr: 3 }}>
                  🌟
                </Typography>
                <Typography variant="body1" component="p">
                  Every employee has to have an updated CV with.
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <ListItem sx={{ padding: "0px 16px" }}>
          <ListItemText
            primary={
              <Box sx={{ display: "flex" }}>
                <Typography variant="body1" component="p" sx={{ pr: 3 }}>
                  🌟
                </Typography>
                <Typography variant="body1" component="p">
                  In Tools click on CV Details and then add Experiences and
                  References which you can add to your CVs.
                </Typography>
              </Box>
            }
          />
        </ListItem>
      </List>
      <br />
      <Typography variant="h6" component="p" sx={{ pb: 6 }}>
        We recommend that you bookmark the different Tools - you will return to
        the Tools a lot🐾🏡
      </Typography>
      <Link
        variant="h4"
        color="inherit"
        rel="noopener noreferrer"
        target="_blank"
        href={props.office}
      >
        Go to Tools
      </Link>
      <br /> <br />
      <Link
        variant="h4"
        color="inherit"
        rel="noopener noreferrer"
        target="_blank"
        href={""}
      >
        Go to Employee Manual
      </Link>
      <Typography variant="h6" component="p" sx={{ pt: 6 }}>
        Then you can click NEXT! 🤘
      </Typography>
      <DoneButton
        myIndex={props.myIndex}
        stepName={props.stepName}
        toggleAccordion={props.toggleAccordion}
        dataCy="toolsNext"
      />
    </div>
  )
}
export default Tools
