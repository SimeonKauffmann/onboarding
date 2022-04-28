import React, { useState } from "react"
import { Typography, Paper, Box } from "@mui/material"
import { GoogleLogin } from "react-google-login"
import { googleClientId } from "../utils/constants"
import theme from "../theme"
import dev from "./../assets/logo_blue.png"
import { login, fetchUser } from "../utils/httpClient"
import { User } from "../types"

const imageSize = {
  maxWidth: 600,
  width: "85%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "unset",
  },
}

const styles = {
  ...theme,
  containerRoot: {
    height: 350,
    display: "grid",
    gridTemplateRows: "88px 50px 50px",
    gridTemplateColumns: "220px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    maxWidth: 1000,
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: 100,
    overflowX: "auto",
    marginBottom: 40,
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      maxWidth: "100vw",
    },
  },
  imageDiv: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      marginBottom: 20,
    },
  },
  image: {
    ...imageSize,
    marginRight: "auto",
    marginLeft: "auto",
  },
  content: {
    marginTop: 10,
  },
} as const

type LoginProps = {
  loginCallback: (isLoggedIn: boolean, userObj: User | {}) => void
}

const Login = ({ loginCallback }: LoginProps) => {
  const [loginFail, setLoginFail] = useState(false)
  const navU = window.navigator.userAgent
  const isAndroidMobile =
    navU.indexOf("Android") > -1 &&
    navU.indexOf("Mozilla/5.0") > -1 &&
    navU.indexOf("AppleWebKit") > -1
  const errorMessage = "Could not login, try again or contact the site admin."

  const googleSuccessCallback = async (response: any) => {
    if (response && response.profileObj) {
      const keysWithAccessToken = Object.keys(response).filter(
        (k: string) => response[k] && response[k].access_token
      )
      if (keysWithAccessToken.length > 0) {
        const loginObj = {
          Email: null,
          GoogleToken: response[keysWithAccessToken[0]].access_token,
        }
        try {
          await login(loginObj)

          setLoginFail(false)

          const user: any = await fetchUser()

          loginCallback(true, user)
        } catch (err) {
          setLoginFail(true)
          console.warn("Error on login", err)
        }
      }
    }
  }
  const googleFailCallback = async (response: any) => {
    setLoginFail(true)
    console.error("Could not login", response.error)
  }

  return (
    <div>
      <Box sx={styles.imageDiv}>
        <img style={{ ...styles.image }} src={dev} alt="logo" />
      </Box>
      <Paper style={{ ...styles.containerRoot }}>
        <Typography variant="h5" component="h2">
          Portal
        </Typography>
        <Typography style={{ ...styles.content, color: "red" }} variant="body2">
          {loginFail &&
            isAndroidMobile &&
            "There have been issues logging in from an android phone. You can try installing chrome to your work profile, use a different browser or use a computer instead"}
        </Typography>
        <Typography
          style={{ ...styles.content, color: loginFail ? "red" : "black" }}
          variant="body1"
        >
          {loginFail
            ? !isAndroidMobile && errorMessage
            : "Use your Google credentials"}
        </Typography>
        <GoogleLogin
          clientId={googleClientId}
          buttonText="Login with Google"
          onSuccess={googleSuccessCallback}
          onFailure={googleFailCallback}
          isSignedIn
          cookiePolicy="single_host_origin"
        />
      </Paper>
    </div>
  )
}

export default Login
