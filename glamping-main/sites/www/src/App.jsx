import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styles from './App.module.css'

export default function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" />
          <Route path="/ophold" />
          <Route path='/ophold/:id' />
          <Route path="/contact" />
          <Route path="/aktiviteter" />
        </Routes>
        </Router>
    </>
  )
}


