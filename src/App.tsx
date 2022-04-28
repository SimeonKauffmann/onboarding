import {
  Box,
  CssBaseline,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link } from "react-scroll"
import {
  fetchOnboardingStatus,
  fetchUser,
  removeToken,
} from "./utils/httpClient"

import Login from "./components/Login"
import ProgressBar from "./components/ProgressBar"
import StepCard from "./components/StepCard"
import { ThemeProvider } from "@mui/material/styles"
import { User, OnboardingStatus } from "./types"
import bigGroupPhoto from "./assets/bigGroupPicture.svg"

import { isEmpty } from "lodash"
import logo from "./assets/logo_blue.png"

import { styled } from "@mui/system"
import testData from "./testData"
import theme from "./theme"

import { fetchDBUser } from "./utils/dbClient"
import { useMyContext } from "./contexts/MyContext"

const isTest = process.env.REACT_APP_CYPRESSTEST

function App() {
  const { setCurrentUserId } = useMyContext()

  const AppLogo = styled("img")({
    width: "35%",
    height: "35%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      width: "149px",
      height: "auto",
    },
  })

  const BackgroundImage = styled("img")({
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("md")]: {
      top: "-100px",
      right: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      top: "0",
      width: "100%",
    },
  })

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [user, setUser] = useState<User | any>({})
  const {
    Count,
    increase,
    checkedArray,
    setChecked,
    setCtxUser,
    setUserObjFunc,
  } = useMyContext()
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [userProgress, setUserProgress] = useState<any>(false)
  const [moveCar, setMoveCar] = useState(0)
  const [onboardingStatus, setOnboardingStatus] = useState<
    OnboardingStatus | any
  >({})

  const [office, setOffice] = useState<string | undefined>(undefined)
  const [newUser, setNewUser] = useState<boolean>(true)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  useEffect(() => {
    if (isTest) {
      setUser({})
      setCurrentUserId("PipelineTest")
      setLoggedIn(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function submit() {
    setIsDisabled(true)
  }

  function findUserProgress(data: any) {
    for (let i: any = 0; i < data.length; i++) {
      if (data[i].completed === false) {
        if (i > 0) {
          setNewUser(false)
        }
        i = `scroll${i}`
        setUserProgress(i)
      }
    }
  }

  const logout = () => {
    removeToken()
    setLoggedIn(false)
    setUser({})
  }

  const loginCallback = async (
    isLoggedIn: boolean,
    userObj: User | any = {}
  ) => {
    if (isLoggedIn) {
      setShowSpinner(true)
    }
    if (isEmpty(userObj)) {
      try {
        userObj = await fetchUser()
        setCurrentUserId(userObj.Id)
      } catch (e) {
        console.error(e)
        logout()
        return
      }
    }

    if (isEmpty(onboardingStatus)) {
      try {
        const onboarding = await fetchOnboardingStatus()
        setOnboardingStatus(onboarding)
      } catch (e) {
        console.error(e)
        return
      }
    }

    if (userObj) {
      try {
        setUserObjFunc(userObj)
        const user = await fetchDBUser(userObj)
        setCurrentUserId(user.userId)
        setCtxUser(user)
        findUserProgress(user.completedSteps)
        user.completedSteps.forEach((step: any) => {
          if (step.completed) {
            setMoveCar((moveCar) => moveCar + 1)
            setChecked(step.stepName)
          }
        })
      } catch (e) {
        console.error(e)
        setShowError(true)
      }
    }

    setCurrentUserId(userObj.Id)

    setLoggedIn(isLoggedIn)

    setShowSpinner(false)
    setUser(userObj)

    if (userObj.hasOwnProperty("EmployeeIds")) {
      setOffice(Object.keys(userObj.EmployeeIds)[0])
    }
  }

  useEffect(() => {
    if (moveCar !== 0) {
      increase()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCar])

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 200)
  }, [])

  const newArray = testData.map((step, index) => (
    <StepCard
      key={"step" + index}
      step={index}
      children={step.children}
      onboardingStatus={onboardingStatus}
      user={user}
      logo={step.logo}
      title={step.title}
      office={office}
      checked={checkedArray.includes(step.name)}
      stepName={step.name}
    ></StepCard>
  ))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <BackgroundImage src={bigGroupPhoto} alt="Dev Group Photo" />

        {showSpinner && (
          <Box
            sx={{
              height: "100vh",
              width: "100vw",
              zIndex: "20",
              backgroundColor: "rgba(0,0,0,0.2)",
              justifyContent: "center",
              top: "0",
              position: "fixed",
              display: "flex",
            }}
          >
            <CircularProgress sx={{ alignSelf: "center" }} />
          </Box>
        )}
        {showError && (
          <Box
            sx={{
              height: "100vh",
              width: "100vw",
              zIndex: "20",
              backgroundColor: "rgba(0,0,0,0.2)",
              justifyContent: "center",
              top: "0",
              position: "fixed",
              display: "flex",
            }}
          >
            <Box
              sx={{
                height: "fit-content",
                margin: "auto 0",
              }}
            >
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                Please try refresh or come back later
              </Typography>
            </Box>
          </Box>
        )}
        {!isLoggedIn && <Login loginCallback={loginCallback} />}
        {isLoggedIn && !showError && user && (
          <>
            <ProgressBar progress={Count} />
            <Box
              sx={{
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "30px 15px",
              }}
            >
              <Typography
                align="center"
                variant="h2"
                component="h2"
                sx={{
                  color: "#777474",
                  fontWeight: "500",
                }}
              >
                {isLoaded &&
                  `${
                    user.Name && user.Name.split(" ")[0].toUpperCase()
                  }, WELCOME TO`}
              </Typography>

              <AppLogo src={logo} alt="Dev Logo" />
            </Box>
            <Box
              sx={{
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "30px 15px",
              }}
            >
              <Box
                sx={{
                  maxWidth: 900,
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: "20px",
                }}
              >
                {isLoaded && (
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      color: "#777474",
                      textAlign: "center",
                    }}
                  >
                    We are so happy to have you here!
                    <br />
                    <br />
                    This onboarding process will help you to become a Dev here
                    🤘
                    <br /> <br /> The race car at the bottom of the screen will
                    follow your progress!💪
                    <br /> In total there are 10 easy steps
                    <br />
                    <br /> 🤫 PS. Make sure to order your computer asap because
                    of long waiting times
                  </Typography>
                )}
              </Box>
            </Box>
            <Box display="flex" justifyContent="center">
              {newUser ? (
                <Link to="scroll0" duration={1000} smooth={true}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={(theme) => ({
                      backgroundColor: theme.palette.secondary.main,
                      fontWeight: "800",
                      padding: "8px 26px",
                      color: "#ffffff",
                    })}
                    disabled={isDisabled}
                    onClick={submit}
                    data-cy="doneIntro"
                  >
                    GET STARTED
                  </Button>
                </Link>
              ) : (
                <Link to={userProgress} duration={1000} smooth={true}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={(theme) => ({
                      backgroundColor: theme.palette.secondary.main,
                      fontWeight: "800",
                      padding: "8px 26px",
                      color: "#ffffff",
                    })}
                  >
                    CONTINUE ONBOARDING
                  </Button>
                </Link>
              )}
            </Box>
            <Box
              sx={{
                position: "relative",
                top: "20vh",
              }}
            >
              {newArray.slice(0, Count / 10 + 1)}
              <Box sx={{ height: "50px", width: "100vw" }}>
                <Typography
                  component="p"
                  sx={{
                    color: "#777474",
                    textAlign: "left",
                  }}
                >
                  Any questions? Please use the form below.
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
