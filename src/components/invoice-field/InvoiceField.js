import React from "react";
import "./InvoiceField.css";


const InvoiceField = ({icon, title, value}) => {
    return (
        <div className="invoice-field-wrapper">
            <div className="title">
                <i className={icon}></i>
                <span>{title}</span>
            </div>
            <span className="value">{value}</span>
        </div>
    );
};


export default InvoiceField;