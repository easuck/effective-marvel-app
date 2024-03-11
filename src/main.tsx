import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Footer from "./components/footer/Footer.tsx"
import {BrowserRouter} from "react-router-dom";
import Router from "./router/Router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Router/>
          <Footer/>
      </BrowserRouter>
  </React.StrictMode>,
)
