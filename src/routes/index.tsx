import React from "react";

import { Route, Routes as RR } from "react-router-dom";
import Login from "../pages/Login";
import { Invoices } from "../pages/Invoices";
import { Ticket } from "./../pages/Ticket/index";

export const Routes = () => (
  <RR>
    <Route path="/" element={<Login />} />
    <Route path="/invoices" element={<Invoices />} />
    <Route path="/ticket" element={<Ticket />} />
  </RR>
);
