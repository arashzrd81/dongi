import React from "react";
import "./CreditInvoice.css";


const Invoice = ({items, date, cost, members}) => {
    return (
        <div className="credit-invoice-wrapper">
            <span className="hole"></span>
            <div className="field">
                <div className="title">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>عنوان خرید:</span>
                </div>
                <span>{items}</span>
            </div>
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
            <div className="field members">
                <div className="title">
                    <i className="fa-solid fa-users"></i>
                    <span>افراد سهیم (دونگرها):</span>
                </div>
                <div className="usernames">
                    {
                        members.map((member, index) => (
                            <div key={index} className="username-wrapper">
                                <span className="username">{member.label}</span>
                                <span className="circle"></span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};


export default Invoice;