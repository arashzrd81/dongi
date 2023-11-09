import React from "react";
import Invoices from "../../components/invoices/Invoices";
import { fakeData } from "../../helper/fakeData";
import "./CreditInvoices.css";


const CreditInvoices = () => {
    return (
        <Invoices invoicesInfo={fakeData} invoiceType="credit" />
    );
};


export default CreditInvoices;