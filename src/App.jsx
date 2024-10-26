import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import { TimerPage } from "./pages/TimerPage";

const theme = createTheme({
  palette: {
    type: "dark",
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
