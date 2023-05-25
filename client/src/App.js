import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scene/HomePage'; // Relative imports instead of ./scene/HomePage by using Config -> set base
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
