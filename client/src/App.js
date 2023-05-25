import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage'; // Relative imports instead of ./scene/HomePage by using Config -> set base
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";



function App() {
  const mode = useSelector((state) => state.mode); // create mode in state (dark or light)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // set up theme

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}> 
        {/* ThemeProvider: uses theme */}
          <CssBaseline />
          {/* Reset CSS to basic CSS */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider> 
      </BrowserRouter>

    </div>
  );
}

export default App;
