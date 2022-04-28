import { Box, Typography, List, ListItem, ListItemText } from "@mui/material"
import DoneButton from "../buttons/DoneButton"
import { myProps } from "../../utils/mytypes"

const SlackGreeting = ({ myIndex, stepName, toggleAccordion }: myProps) => {
  const introductionTopics = [
    {
      icon: "🏡",
      subject: "Where you're from",
    },
    {
      icon: "🐾",
      subject: "If you have any dear pets",
    },
    {
      icon: "⚽️",
      subject: "Hobbies that you might have",
    },
    {
      icon: "🖥",
      subject: "What you have done before",
    },
    {
      icon: "🌟",
      subject: "Something that you are proud of",
    },
  ]
  return (
    <>
      <Typography variant="h6" component="p" sx={{ pb: 2 }}>
        It's time to introduce yourself to the gang! 👋
        <br />
        Write an introduction about yourself that you later will share.
        <br /> Some suggestions of topics could be:
      </Typography>
      <List>
        {introductionTopics.map((i, x) => (
          <ListItem key={x} sx={{ padding: "0px 16px" }}>
            <ListItemText
              primary={
                <Box sx={{ display: "flex" }}>
                  <Typography variant="body1" component="p" sx={{ pr: 3 }}>
                    {i.icon}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {i.subject}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" component="p" sx={{ pb: 2 }}>
        As soon as you are done with preparing your introduction you are ready
        to move on to step {myIndex + 2}! 👇
      </Typography>
      <DoneButton
        myIndex={myIndex}
        stepName={stepName}
        dataCy={"slackIntroNext"}
        toggleAccordion={toggleAccordion}
      />
    </>
  )
}

export default SlackGreeting
