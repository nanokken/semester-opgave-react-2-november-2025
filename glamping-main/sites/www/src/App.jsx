import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./App.module.css";
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition/PageTransition';

// Pages
import Home from "./pages/Home/Home.jsx";
import Ophold from "./pages/Ophold/Ophold.jsx";
import OpholdDetail from "./pages/OpholdDetail/OpholdDetail.jsx";
import Kontakt from "./pages/Kontakt/Kontakt.jsx";
import Aktiviteter from "./pages/Aktiviteter/Aktiviteter.jsx";

// Components
import Nav from "./components/Nav/Nav.jsx";
import Footer from "./components/Footer/Footer.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a4f57',
    },
    secondary: {
      main: '#829B97',
    },
  },
  typography: {
    fontFamily: '"Vend Sans", sans-serif',
    h1: {
      fontFamily: '"Zen Loop", cursive',
    },
    h2: {
      fontFamily: '"Zen Loop", cursive',
    },
  },
});

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/ophold" element={<PageTransition><Ophold /></PageTransition>} />
          <Route path='/ophold/:id' element={<PageTransition><OpholdDetail /></PageTransition>} />
          <Route path="/kontakt" element={<PageTransition><Kontakt /></PageTransition>} />
          <Route path="/aktiviteter" element={<PageTransition><Aktiviteter /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}
