import { Typography, Link } from "@mui/material"

import { useReducer } from "react"
import GithubForm from "../forms/GithubForm"
import { User } from "../../types"

export interface GithubType {
  Username: string
}

interface GitProps {
  myIndex: number
  stepName: string
  user: User | {}
  toggleAccordion: () => void
}

const Github = ({ myIndex, stepName, user, toggleAccordion }: GitProps) => {
  //   const { checkedArray } = useMyContext()
  //   console.log(checkedArray, checkedArray.includes(myIndex))

  const useGithubReducer = () =>
    useReducer(
      (state: GithubType, newState: Partial<GithubType>) => {
        return { ...state, ...newState }
      },
      {
        Username: "",
      }
    )
  const [Username, setUsername] = useGithubReducer()

  return (
    <>
      <Typography variant="h6" component="p" sx={{ pb: 2 }}>
        We would love to connect with you in Github as well 🤙 <br /> <br />
        Please enter your Github username and we'll add you to our organization
        ASAP 😸
      </Typography>
      <GithubForm
        username={Username}
        setGithubUser={setUsername}
        myIndex={myIndex}
        stepName={stepName}
        user={user}
        toggleAccordion={toggleAccordion}
      />
      <Typography variant="h6" component="p" sx={{ pb: 2, mt: 15 }}>
        If you want to check out our repo right now, you'll find us @ 👉
        <Link rel="noopener noreferrer" target="_blank" variant="h6" href="">
          github.com
        </Link>
      </Typography>
    </>
  )
}

export default Github
