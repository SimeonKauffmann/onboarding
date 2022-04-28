import React, { useEffect, useState } from "react"
import {
  Box,
  LinearProgress,
  Typography,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material"
import KartIcon from "./icons/KartIcon"
import FlagIcon from "./icons/FlagIcon"
import JSConfetti from "js-confetti"
import useMediaQuery from "@mui/material/useMediaQuery"
import theme from "../theme"

type progressBarProps = {
  progress: number
}

const ProgressBar = ({ progress }: progressBarProps) => {
  // --- Adds Confetti ---
  // const canvas = document.getElementById("custom_canvas");
  const isLargerDevice = useMediaQuery(theme.breakpoints.up("lg"))
  const [closed, setClosed] = useState(false)
  useEffect(() => {
    if (progress === 100) {
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti({
        emojiSize: isLargerDevice ? 6 : 11,
        emojis: ["✨", "⭐️", "⭐️", "🔹", "🔸", "🍀", "♦️"],
        confettiNumber: 600,
      })
    }
  }, [isLargerDevice, progress])

  // --- End Adds Confetti ---

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {progress === 100 && !closed && (
        <Alert
          data-cy="onboardingComplete"
          sx={{
            border: "solid darkGray 1px",
            zIndex: "2",
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: "-100px",
            marginLeft: "-150px",
            width: "300px",
            height: "200px",
            alignItems: "center",
          }}
          severity="success"
        >
          <AlertTitle>GOD JOB!</AlertTitle>
          Your onboarding is now completed!
          <Button onClick={() => setClosed(true)}>Close</Button>
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#f4f4f4",
          borderRadius: "10px 10px 5px 5px",
          position: "fixed",
          bottom: "0",
          zIndex: "2",
          width: "350px",
          height: "50px",
          paddingLeft: "20px",
          paddingRight: "20px",
          opacity: "50%",
          "&:hover": {
            opacity: "100%",
          },
        }}
      >
        <Box id="custom_canvas" sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "254px",
              position: "absolute",
            }}
          >
            {progress < 100 && (
              <KartIcon
                sx={{
                  position: "absolute",
                  zIndex: "2",
                  top: "-9px",
                  left: progress - 5.5 + "%",
                  width: "1.8rem",
                  height: "1.8rem",
                }}
              ></KartIcon>
            )}
            <FlagIcon
              sx={{
                position: "absolute",
                zIndex: "2",
                top: "-8px",
                left: "97%",
              }}
            ></FlagIcon>
          </Box>
          <LinearProgress
            data-cy="progress"
            variant="determinate"
            value={progress}
            color="secondary"
            sx={{ height: "12px", borderRadius: "10px", width: "254px" }}
          />
        </Box>
        <Box sx={{ minWidth: "10%", ml: 2 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "600", color: "#777474" }}
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProgressBar
