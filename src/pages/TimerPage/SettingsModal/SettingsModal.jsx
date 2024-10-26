/* eslint-disable react/prop-types */

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PlanTierCard } from "./PlanTierCard";

export function SettingsModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCustomStart = () => {
    handleClose();
    props.onCustomStart(plans[plan]["config"]);
  };

  const ModalWrapper = ({ children }) => (
    <>
      <Button
        sx={{
          textTransform: "lowercase",
          letterSpacing: "2px",
          width: "100%",
          backgroundColor: "#1D2020",
          color: "white",
        }}
        onClick={handleOpen}
      >
        Settings
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1D2020",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {children}
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 0, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </>
  );

  const [plan, setPlan] = useState("classic");

  const plans = {
    quick: {
      imgSrc: "study_2.gif",
      title: "quickie",
      time: "5",
      goal: "its something",
      config: {
        totalTime: { m: 5, s: 0 },
        totalCount: 3,
        type: "study",
      },
    },
    classic: {
      imgSrc: "study_1.gif",
      title: "the classic 25",
      time: "25",
      goal: "reading or light coding",
      config: {
        totalTime: { m: 25, s: 0 },
        totalCount: 3,
        type: "study",
      },
    },
    legend: {
      imgSrc: "study_3.gif",
      title: "the legend",
      time: "50",
      goal: "grind time",
      config: {
        totalTime: { m: 50, s: 0 },
        totalCount: 3,
        type: "study",
      },
    },
  };

  const handleChange = (event, newPlan) => {
    setPlan(newPlan);
  };

  const selectProgramTypePage = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography sx={{ color: "white" }}>Choose your study plan:</Typography>
        <Box>
          <ToggleButtonGroup
            color="primary"
            value={plan}
            exclusive
            onChange={handleChange}
            aria-label="Plan"
            sx={{
              gap: "10px",
              width: "100%",
            }}
          >
            {Object.keys(plans).map((k) => (
              <ToggleButton
                value={k}
                sx={{ color: "white", textTransform: "lowercase" }}
                variant="outlined"
                key={k}
              >
                {k}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <PlanTierCard
          imgSrc={plans[plan]["imgSrc"]}
          title={plans[plan]["title"]}
          time={plans[plan]["time"]}
          goal={plans[plan]["goal"]}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            textTransform: "lowercase",
            width: "80%",
          }}
          onClick={handleCustomStart}
        >
          Get started
        </Button>
      </Box>
    </>
  );

  return <ModalWrapper>{selectProgramTypePage}</ModalWrapper>;
}
