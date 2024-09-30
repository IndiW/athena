/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import "./global.css";
import { styled } from "@mui/material/styles";
import { linearProgressClasses } from "@mui/material/LinearProgress";

const QUOTES = ["minipomi", "Get work done."];
export function HomePage(props) {
  const quote = QUOTES[0];
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#1D2020",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "85%",
          gap: "10px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: "500",
            letterSpacing: "8px",
          }}
        >
          {quote}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "white",
            letterSpacing: "6px",
            textAlign: "center",
          }}
        >
          a minimalist pomodoro experience.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "70%",
            letterSpacing: "4px",
            textTransform: "lowercase",
          }}
          onClick={props.handleQuickStart}
        >{`Let's go`}</Button>
        <Button
          sx={{ letterSpacing: "4px", textTransform: "lowercase" }}
          disabled={true}
        >
          Custom Path
        </Button>
      </Box>
    </Box>
  );
}
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

const STUDY_LEVEL_CONFIGS = [
  {
    image:
      "https://camo.githubusercontent.com/f57d36d59b1b8278b04220393dd9ea6c8b4c64e86586dd52939a54d47e5834d9/68747470733a2f2f6d656469612e74656e6f722e636f6d2f7073517a4648496b6f344d41414141642f73747564792d616e696d652e676966",
    colors: {
      primary: "#1D2020",
      background: "#7D5C34",
    },
  },
  {
    image: "https://c.tenor.com/zk6OuE-RGngAAAAC/tenor.gif",
    colors: {
      primary: "#171825ff",
      background: "#314436ff",
    },
  },
  {
    image: "https://c.tenor.com/_h_1fcwEkHYAAAAC/tenor.gif",
    colors: {
      primary: "#2F251Eff",
      background: "#668692ff",
    },
  },
  {
    image:
      "https://steamuserimages-a.akamaihd.net/ugc/936060405260687074/AE4BAE513AB11BBBEFEA78059FC3B3FDEF9A1C8F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    colors: {
      primary: "#902625ff",
      background: "#F3EFDCff",
    },
  },
];

export default function App() {
  const [level, setLevel] = useState(0);
  const config = STUDY_LEVEL_CONFIGS[level];
  const totalTime = { m: 25, s: 0 }; // time in mins
  const [timer, setTimer] = useState(totalTime);
  const [start, setStart] = useState(false);
  const [totalCount, setTotalCount] = useState(3);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);

  const resetTime = () => {
    setStart(false);
    if (level < totalCount) {
      setLevel((l) => l + 1);
    }
  };
  const handleStart = () => {
    setStart(!start);
  };

  const getTime = (time) => {
    if (time.s - 1 < 0 && time.m <= 0) {
      resetTime();
      return totalTime;
    }

    const newProgress =
      progress + 100 / ((totalTime.m * 60 + totalTime.s) * totalCount);
    setProgress(newProgress);
    if (time.s - 1 < 0) {
      return { m: time.m - 1, s: 59 };
    }

    return { m: time.m, s: time.s - 1 };
  };

  useEffect(() => {
    console.log(progress);
  }, [progress]);

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

  if (page === 0) {
    return <HomePage handleQuickStart={() => setPage(1)} />;
  }

  const isNotLastPage = level < totalCount;

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
      <Box sx={{ width: "80%" }}>
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
            height: "200px", // Set the desired height
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
              height: "auto",
              objectFit: "cover",
              objectPosition: "center",
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
      {isNotLastPage ? (
        <Button
          onClick={handleStart}
          variant="contained"
          sx={{
            backgroundColor: config.colors.primary,
            textTransform: "lowercase",
            letterSpacing: "2px",
            width: "60%",
          }}
        >
          {start ? "Pause" : "Start"}
        </Button>
      ) : (
        <Button
          onClick={() => {
            setPage(0);
            setLevel(0);
            setProgress(0);
          }}
          variant="contained"
          sx={{
            backgroundColor: config.colors.primary,
            textTransform: "lowercase",
            letterSpacing: "2px",
            width: "60%",
          }}
        >
          Run it back
        </Button>
      )}
    </Box>
  );
}

function formatTime(m, s) {
  return `${m}:${s > 9 ? s : "0" + s}`;
}
