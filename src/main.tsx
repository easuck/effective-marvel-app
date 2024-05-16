import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom";
import Router from "./router/Router.tsx";
import {register} from "./swRegistration.ts"


ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
          <Router/>
      </BrowserRouter>
);

register();
