import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom";
import Router from "./router/Router.tsx";
import {register} from "./swRegistration.ts"
import environments from "./config/environments.ts";


ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
          <Router/>
      </BrowserRouter>
);

if (environments.swSubscribeURL) register();
