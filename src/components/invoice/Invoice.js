import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import InvoiceField from "../invoice-field/InvoiceField";
import "./Invoice.css";


const Invoice = ({invoiceType, items, date, cost, members}) => {

    const [showDetails, setShowDetails] = useState(false);

    const invoiceWrapperRef = useRef();
    const detailsRef = useRef();

    useEffect(() => {
        if (showDetails) {
            gsap.to(detailsRef.current, {
                duration: 0.5,
                ease: "power1.out",
                height: "auto"
            });
        } else {
            gsap.to(detailsRef.current, {
                duration: 0.5,
                ease: "power1.out",
                height: 0
            });
        }
    }, [showDetails]);

    const handleDelete = async () => {
        setShowDetails(false);
        await new Promise(r => setTimeout(r, 500));
        gsap.to(invoiceWrapperRef.current, {
            duration: 0.75,
            ease: "Elastic.easeIn(0.5)",
            opacity: 0,
            scale: 0
        });
        gsap.to(invoiceWrapperRef.current, {
            duration: 0.75,
            delay: 0.75,
            ease: "Elastic.easeIn(0.5)",
            display: "none"
        });
    };

    return (
        <div ref={invoiceWrapperRef} className="invoice-wrapper">
            <div className="main">
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
                <div ref={detailsRef} className="details">
                    <InvoiceField
                        icon="fa-regular fa-calendar-days"
                        title="تاریخ خرید:"
                        value={date}
                    />
                    <InvoiceField
                        icon="fa-solid fa-tag"
                        title="مجموع هزینه‌ی انجام شده:"
                        value={cost}
                    />
                    {
                        invoiceType === "credit" ?
                        <div className="invoice-field-wrapper members">
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
                        </div> :
                        <div className="invoice-field-wrapper share">
                            <div className="info">
                                <div className="title">
                                    <i className="fa-solid fa-pizza-slice"></i>
                                    <span>دونگ شما:</span>
                                </div>
                                <span>{cost}</span>
                            </div>
                            <button>پرداخت</button>
                        </div>
                    }
                </div>
            </div>
            <div className="delete-invoice-wrapper" onClick={handleDelete}>
                <i className="fa-solid fa-trash-can"></i>
            </div>
        </div>
    );
};


export default Invoice;