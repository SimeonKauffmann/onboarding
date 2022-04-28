import slackLogo from "./assets/slackLogo.png"
import forms from "./assets/forms.png"
import toolsLogoWhite from "./assets/toolsLogoWhite.png"
import book from "./assets/book.svg"
import linkedin from "./assets/linkedin.svg"
import Slack from "./components/stepComponents/Slack.tsx"
import slackHello from "./assets/slackHand.png"
import SlackGreeting from "./components/stepComponents/SlackGreeting"
import Hardware from "./components/stepComponents/Hardware"
import ICE from "./components/stepComponents/ICE"
import iceLogo from "./assets/iceLogo.png"
import profile from "./assets/profile.png"
import Profile from "./components/stepComponents/Profile"
import Playbook from "./components/stepComponents/Playbook"
import Linkedin from "./components/stepComponents/Linkedin"
import Github from "./components/stepComponents/Github"
import github from "./assets/github.svg"
import Tools from "./components/stepComponents/Tools"
import onePassword from "./assets/onePassword.png"
import OnePass from "./components/stepComponents/OnePass"

const data = [
  {
    name: "Playbook",
    title: "Playbook",
    logo: book,
    children: <Playbook myIndex={0} />,
  },
  {
    name: "Slack Intro",
    title: "Say Hello to our little friends",
    logo: slackHello,
    children: <SlackGreeting myIndex={1} />,
  },
  {
    name: "Slack Join",
    title: "Join Slack & share an introduction",
    logo: slackLogo,
    children: <Slack myIndex={2} />,
  },
  {
    name: "Hardware",
    title: "Order Work Gear",
    logo: forms,
    children: <Hardware myIndex={3} />,
  },
  {
    name: "Contact",
    title: "Contact details",
    logo: profile,
    children: <Profile myIndex={4} />,
  },
  {
    name: "Ice",
    title: "In case of emergency",
    logo: iceLogo,
    children: <ICE myIndex={5} />,
  },
  {
    name: "LinkedIn",
    title: "LinkedIn",
    logo: linkedin,
    children: <Linkedin myIndex={6} />,
  },
  {
    name: "Github",
    title: "Github",
    logo: github,
    children: <Github myIndex={7} />,
  },
  {
    name: "Tools",
    title: "Tools",
    logo: toolsLogoWhite,
    children: <Tools myIndex={8} office={undefined} />,
  },
  {
    name: "1Pass",
    title: "1Password",
    logo: onePassword,
    children: <OnePass myIndex={9} office={undefined} />,
  },
]

data.map((element, index) => {
  if (element.title === "Handbook" && index % 2 === 0) {
    element.logo = toolsLogoWhite
  }
  return element
})

export default data
