/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

export function WhatILearnedModal(props) {
  const [inputValue, setInputValue] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = () => {
    props.handleSubmit(inputValue);
    props.handleClose();
  };

  const handleChange = (event) => {
    if (event.target.value.length <= 100) {
      setInputValue(event.target.value);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: isMobile ? "100%" : 400, // Full width on mobile, 400px on desktop
    height: isMobile ? "100%" : "auto", // Full height on mobile
    backgroundColor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={modalStyle} autoComplete="off" component="form">
          <Typography variant="h6" component="h2" gutterBottom>
            what did you learn?
          </Typography>
          <TextField
            fullWidth
            multiline
            label="TIL"
            value={inputValue}
            onChange={handleChange}
            slotProps={{
              input: { maxLength: 100 },
            }}
            helperText={`${inputValue.length}/100`}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{
              textTransform: "lowercase",
              letterSpacing: "2px",
              width: "100%",
              backgroundColor: "#1D2020",
              color: "white",
            }}
          >
            Submit
          </Button>

          <IconButton
            onClick={props.handleClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
