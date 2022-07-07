import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Routes } from "./routes";
import { InvoiceContextProvider } from "./Shared/contextInvoice";
import { OnlineStatusProvider } from "./Shared/contextOnlineStatus";
// import GlobalStyle from "./styles/global";
import "./index.css";

const App = () => (
  <OnlineStatusProvider>
    <InvoiceContextProvider>
      {/* <GlobalStyle /> */}
      <Router>
        <Routes />
      </Router>
    </InvoiceContextProvider>
  </OnlineStatusProvider>
);

export default App;
