import React, { useState } from "react";
import "./DebtInvoice.css";


const DebtInvoice = ({items, date, cost}) => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="debt-invoice-wrapper">
            <div className="header" onClick={() => setShowDetails(!showDetails)}>
                <div>
                    <i className="fa-solid fa-clipboard-list"></i>
                    <span>{items}</span>
                </div>
                <div>
                    <span>جزئیات</span>
                    {
                        showDetails ?
                        <i className="fa-solid fa-chevron-up"></i> :
                        <i className="fa-solid fa-chevron-down"></i>
                    }
                </div>
            </div>
            {
                showDetails &&
                <div className="details">
                    <div className="field">
                        <div className="title">
                            <i className="fa-regular fa-calendar-days"></i>
                            <span>تاریخ خرید:</span>
                        </div>
                        <span>{date}</span>
                    </div>
                    <div className="field">
                        <div className="title">
                            <i className="fa-solid fa-tag"></i>
                            <span>مجموع هزینه‌ی انجام شده:</span>
                        </div>
                        <span>{cost}</span>
                    </div>
                    <div className="field share">
                        <div className="info">
                            <div className="title">
                                <i className="fa-solid fa-pizza-slice"></i>
                                <span>دونگ شما:</span>
                            </div>
                            <span>{cost}</span>
                        </div>
                        <button>پرداخت</button>
                    </div>
                </div>
            }
        </div>
    );
};


export default DebtInvoice;