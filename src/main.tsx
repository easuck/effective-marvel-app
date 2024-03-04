import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from "./components/header/header.tsx";
import Footer from "./components/footer/footer.tsx"
import Characters from "./components/characters/characters.tsx";
import CharacterInfo from "./components/characterInfo/characterInfo.tsx"
import {BrowserRouter} from "react-router-dom";
import Router from "./routes.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Router/>
          <Footer/>
      </BrowserRouter>
  </React.StrictMode>,
)
