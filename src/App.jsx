import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
//import Data from './modules/Example'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Vocabulary from './pages/Vocabulary'
import Exercises from './pages/Exercises'
import About from './pages/About'
import HowToUse from './pages/HowToUse'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/vocabulary/*" element={<Vocabulary />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-use" element={<HowToUse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
