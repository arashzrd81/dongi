import React from "react";
import Invoices from "../../components/invoices/Invoices";
import { fakeData } from "../../helper/fakeData";
import "./DebtInvoices.css";


const DebtInvoices = () => {
    return (
        <Invoices invoicesInfo={fakeData} invoiceType="debt" />
    );
};


export default DebtInvoices;