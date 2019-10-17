import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import Routes from './routes';

const initApp = () => {
     
    ReactDOM.render(
        <BrowserRouter>
            <Routes />
        </BrowserRouter>,
      document.getElementById("root")
    );
};

export default initApp;
