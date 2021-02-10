import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import ProductsProvider from "./context";

ReactDOM.render(
  <ProductsProvider>
    <Router basename={window.location.pathname || ""}>
      <App />
    </Router>
  </ProductsProvider>,
  document.getElementById("root")
);
