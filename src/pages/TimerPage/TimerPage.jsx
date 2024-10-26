import { useState, useEffect } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { SettingsModal } from "./SettingsModal";
import { WhatILearnedModal } from "./WhatILearnedModal";
import { STUDY_LEVEL_CONFIGS } from "../../config/config";

const BorderLinearProgress = styled(LinearProgress)(({ barcolor }) => ({
  height: 4,
  // borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "white",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: barcolor,
  },
}));

export function TimerPage() {
  const [level, setLevel] = useState(0);
  const [start, setStart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [customConfig, setCustomConfig] = useState({
    totalTime: { m: 25, s: 0 },
    totalCount: 3,
    type: "study",
  });
  const [timer, setTimer] = useState(customConfig.totalTime);
  const [showLearningsDialog, setShowLearningsDialog] = useState(true);
  const [learnedList, setLearnedList] = useState([]);

  const handleNewLearningsSubmit = (text) => {
    const currentDate = getCurrentDateTime();
    setLearnedList([{ timestamp: currentDate, content: text }, ...learnedList]);
  };

  const config = STUDY_LEVEL_CONFIGS[level];

  const onCustomStart = (newCustomConfig) => {
    setCustomConfig(newCustomConfig);
    setTimer(newCustomConfig.totalTime);
    setLevel(0);
    setStart(false);
  };
  const resetTime = () => {
    setStart(false);
    if (level < customConfig.totalCount) {
      setLevel((l) => l + 1);
    }
    showLearningsDialog(true);
  };

  const handleStart = () => {
    setStart(!start);
  };

  const getTime = (time) => {
    if (time.s - 1 < 0 && time.m <= 0) {
      resetTime();
      return customConfig.totalTime;
    }

    const newProgress =
      progress +
      100 /
        ((customConfig.totalTime.m * 60 + customConfig.totalTime.s) *
          customConfig.totalCount);
    setProgress(newProgress);
    if (time.s - 1 < 0) {
      return { m: time.m - 1, s: 59 };
    }

    return { m: time.m, s: time.s - 1 };
  };

  useEffect(() => {
    if (start) {
      const t = setTimeout(() => {
        setTimer((time) => getTime(time));
      }, 1000);

      return () => clearTimeout(t);
    }
  }, [start, timer]);

  useEffect(() => {
    document.title = formatTime(timer.m, timer.s);
  }, [timer]);

  const isNotLastPage = level < customConfig.totalCount;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "10px",
        backgroundColor: config.colors.background,
        margin: 0,
        padding: "0px 4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "0px 20px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          {isNotLastPage ? (
            <BorderLinearProgress
              variant="determinate"
              value={progress}
              barcolor={config.colors.primary}
            />
          ) : undefined}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            textAlign: "center",
            color: "white",
            background: "linear-gradient",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "99",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              letterSpacing: "8px",
            }}
          >
            {isNotLastPage ? formatTime(timer.m, timer.s) : "Done."}
          </Typography>
          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={config.image}
              alt="studying"
              style={{
                width: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: `rgba(0,0,0,0.5)`,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isNotLastPage ? (
            <Button
              onClick={handleStart}
              variant="contained"
              sx={{
                backgroundColor: config.colors.primary,
                textTransform: "lowercase",
                letterSpacing: "2px",
                width: "100%",
              }}
            >
              {start ? "Pause" : "Start"}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setLevel(0);
                setProgress(0);
              }}
              variant="contained"
              sx={{
                backgroundColor: config.colors.primary,
                textTransform: "lowercase",
                letterSpacing: "2px",
                width: "100%",
              }}
            >
              Run it back
            </Button>
          )}
          <SettingsModal onCustomStart={onCustomStart} />
          <WhatILearnedModal
            open={showLearningsDialog}
            handleClose={() => setShowLearningsDialog(false)}
            handleSubmit={handleNewLearningsSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
}

function formatTime(m, s) {
  return `${m}:${s > 9 ? s : "0" + s}`;
}

const getCurrentDateTime = () => {
  const now = new Date();

  // Get the hours, minutes, day, month, and year
  const hours = String(now.getHours()).padStart(2, "0"); // 24-hour format
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = now.getFullYear();

  // Format the date and time
  return `${hours}:${minutes} ${day}-${month}-${year}`;
};
