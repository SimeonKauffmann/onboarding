import { Link, Typography } from "@mui/material"
import DoneButton from "../buttons/DoneButton"

interface Props {
  myIndex: number
  office: string | undefined
  stepName: string
  toggleAccordion: () => void
}

const Handbook = (props: Props) => {
  return (
    <div data-cy="onePass" style={{ margin: "0", padding: "0" }}>
      <Typography variant="h6" component="p" sx={{ pb: 6 }}>
        We have a document with steps to get access to necessary services, for
        example, Azure, AWS etc. The document is updated whenever needed
      </Typography>

      <Link
        variant="h4"
        color="inherit"
        rel="noopener noreferrer"
        target="_blank"
        href={""}
      >
        Sign Up To 1Pass
      </Link>

      <Typography variant="h6" component="p" sx={{ pt: 6 }}>
        Then you can click DONE and finish the final step! 🤘
      </Typography>
      <DoneButton
        data-cy="onePassNext"
        myIndex={props.myIndex}
        stepName={props.stepName}
        text="done"
        toggleAccordion={props.toggleAccordion}
      />
    </div>
  )
}
export default Handbook
