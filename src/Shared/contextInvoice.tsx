import { createContext, useContext, useState } from "react";
import React from "react";
import { IInvoice } from "./../pages/Invoices/index";

interface IInvoiceContextProps {
  currentInvoice?: IInvoice;
  setCurrentInvoice: (value: IInvoice) => void;
  invoices: IInvoice[];
  setInvoices: (value: IInvoice[]) => void;
}

export const InvoiceContext = createContext<IInvoiceContextProps>(
  {} as IInvoiceContextProps
);

interface IProviderProps {
  children: React.ReactNode;
}

export const InvoiceContextProvider = ({ children }: IProviderProps) => {
  const [currentInvoice, setCurrentInvoice] = useState<IInvoice>();
  const [invoices, setInvoices] = useState<IInvoice[]>([]);

  return (
    <InvoiceContext.Provider
      value={{ currentInvoice, setCurrentInvoice, invoices, setInvoices }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): IInvoiceContextProps => {
  const context = useContext(InvoiceContext);

  if (!context) {
    throw new Error("useFiles must be used within FileProvider");
  }

  return context;
};
