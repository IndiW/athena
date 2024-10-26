/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";

export function PlanTierCard({ title, time, goal, imgSrc }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
        backgroundColor: "#EAE5D3",
        padding: "12px",
        gap: "10px",
        borderRadius: "10px",
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width={"100%"} height={200} />
      ) : null}
      <img
        src={imgSrc}
        alt="study"
        style={
          isLoading
            ? { display: "none" }
            : { width: "100%", borderRadius: "10px" }
        }
        onLoad={() => setIsLoading(false)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ width: "100%", fontWeight: "600" }}>
          {title}
        </Typography>
        <Box sx={{ width: "100%", whiteSpace: "pre" }}>
          <Typography>{`time   ${time} minute focus block`}</Typography>
          <Typography>{`goal   ${goal}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
