import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

// Pages
import Home from "./pages/Home/Home.jsx";
import Ophold from "./pages/Ophold/Ophold.jsx";
import OpholdDetail from "./pages/OpholdDetail/OpholdDetail.jsx";
import Kontakt from "./pages/Kontakt/Kontakt.jsx";
import Aktiviteter from "./pages/Aktiviteter/Aktiviteter.jsx";

// Components
import Nav from "./components/Nav/Nav.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ophold" element={<Ophold />} />
          <Route path='/ophold/:id' element={<OpholdDetail />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/aktiviteter" element={<Aktiviteter />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}
