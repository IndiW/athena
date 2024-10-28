import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import { TimerPage } from "./pages/TimerPage";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1D2020",
      paper: "#1D2020",
    },
    primary: {
      main: "#ffffff",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TimerPage />
    </ThemeProvider>
  );
}
