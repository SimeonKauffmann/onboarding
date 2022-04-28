import React, { useState, useEffect } from "react"
import { isEmpty } from "lodash"
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Link,
  Box,
} from "@mui/material"
import { OnboardingStatus, User } from "../../types"
import DoneButton from "../buttons/DoneButton"

interface Props {
  onboardingStatus: OnboardingStatus
  user: User
  checked: boolean
  myIndex: number
  stepName: string
  toggleAccordion: () => void
}

const Slack = (props: Props) => {
  const [slackChannels, setSlackChannels] = useState<string[]>([
    "general",
    "random",
    "programming",
    "ständig-kompetensutveckling",
  ])

  useEffect(() => {
    if (!isEmpty(props.user)) {
      if (Object.keys(props.user.EmployeeIds).includes("GBG")) {
        setSlackChannels((slackChannels) => [
          ...slackChannels,
          "kontoret",
          "gbg",
        ])
      }

      if (Object.keys(props.user.EmployeeIds).includes("STHLM")) {
        setSlackChannels((slackChannels) => [...slackChannels, "sthlm"])
      }

      if (Object.keys(props.user.EmployeeIds).includes("DCE")) {
        setSlackChannels((slackChannels) => [
          ...slackChannels,
          "kontoret",
          "gbg",
        ])
      }

      if (Object.keys(props.user.EmployeeIds).includes("FRIENDS")) {
        setSlackChannels((slackChannels) => [
          ...slackChannels,
          "kontoret",
          "gbg",
          "friends",
        ])
      }
    }
  }, [props.user])

  return (
    <>
      <Typography variant="h6" component="p" sx={{ pb: 2 }}>
        Join our Slack universe! 🌌 <br />
        This is the main platform for our communication.
        <br />
        Eventually you will find all the right channels for you, but you should
        definitely join these right now:
      </Typography>
      <List>
        {slackChannels.map((i, x) => (
          <ListItem key={x} sx={{ padding: "0px 16px" }}>
            <ListItemText primary={"#" + i} />
          </ListItem>
        ))}
      </List>
      <Typography sx={{ pt: 5 }}>
        📣 Done with your introduction? Then you can press the{" "}
        <b>{props.checked ? "Go To Slack" : "Join Slack"}</b> button, and share
        it in the channel <b>#general</b>. 📣
      </Typography>

      {props.onboardingStatus.HasJoinedSlack ? (
        <>
          <DoneButton
            stepName={props.stepName}
            myIndex={props.myIndex}
            toggleAccordion={props.toggleAccordion}
          />
          <Box sx={{ textAlign: "center" }}>
            <Link rel="noopener noreferrer" target="_blank" href="">
              <Button
                variant="contained"
                size="medium"
                sx={[
                  (theme) => ({
                    backgroundColor: "white",
                    fontWeight: "800",
                    padding: "6px 26px ",
                    margin: "6px auto",
                    color: theme.palette.primary.dark,
                    [theme.breakpoints.down("sm")]: {
                      float: "unset",
                      width: "30vw",
                    },
                    [theme.breakpoints.up("sm")]: {
                      float: "right",
                    },
                  }),
                  (theme) => ({
                    "&:hover": {
                      color: "white",
                    },
                  }),
                ]}
              >
                Go To Slack
              </Button>
            </Link>
          </Box>
        </>
      ) : (
        <DoneButton
          stepName={props.stepName}
          myIndex={props.myIndex}
          text={"Join Slack"}
          link={""}
          dataCy={"slackJoinNext"}
          toggleAccordion={props.toggleAccordion}
        />
      )}
    </>
  )
}

export default Slack
