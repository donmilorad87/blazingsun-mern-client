import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

import Logo from './core/Logo';



import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/stylesheet.css'; 


import { createBrowserHistory } from "history";

const history = createBrowserHistory();





ReactDOM.render(
  <React.StrictMode>

 

    <Logo />
    <Routes history={history}/>

    
    
  </React.StrictMode>,
  document.getElementById('root')
  
);


