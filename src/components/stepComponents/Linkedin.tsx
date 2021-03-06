import { Box, Typography, List, ListItem, ListItemText } from "@mui/material"
import DoneButton from "../buttons/DoneButton"
import { myProps } from "../../utils/mytypes"

const Linkedin = ({ myIndex, stepName, toggleAccordion }: myProps) => {
  const introductionTopics = [
    {
      icon: "π",
      subject: "Click the  Me icon at top of your LinkedIn homepage.",
    },
    {
      icon: "π",
      subject: "Click View Profile.",
    },
    {
      icon: "π",
      subject: "Click the  Edit icon in your introduction section.",
    },
    {
      icon: "π",
      subject:
        "In the pop-up window that appears, under the Current Position field, click Add new position and enter.",
    },
    {
      icon: "π",
      subject: "Select I am currently working in this role checkbox.",
    },
  ]

  return (
    <>
      <Typography variant="h6" component="p" sx={{ pb: 2 }}>
        Let's connect at LinkedIn aswell π
        <br /> To update your current position you can follow these stepsπΎ
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
        <br />
        GJ! One step left, please add your new colleagues in LinkedIn. You can
        find them on the LinkedIn Page π
        <br />
        Then you can click NEXT! π€
      </Typography>

      <DoneButton
        myIndex={myIndex}
        stepName={stepName}
        toggleAccordion={toggleAccordion}
        dataCy={"linkedinNext"}
      />
    </>
  )
}

export default Linkedin
