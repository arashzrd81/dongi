import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import InvoiceField from "../invoice-field/InvoiceField";
import "./ApproveInvoice.css";


const ApproveInvoice = ({items, date, cost, members}) => {

    const [deleteInvoice, setDeleteInvoice] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            gsap.to(".approve-invoice-wrapper", {
                duration: 1,
                ease: "Elastic.easeOut(0.4)",
                scale: 1
            });
            gsap.to("form", {
                duration: 1,
                delay: 1,
                ease: "Elastic.easeOut(0.4)",
                scale: 1
            });
        };
        handleTransition();
    }, []);

    const handleSelect = async e => {
        e.preventDefault();
        gsap.to(".approve-invoice-wrapper", {
            duration: 0.75,
            ease: "power1.out",
            opacity: 0.3
        });
        gsap.to("i:nth-child(2)", {
            duration: 0.75,
            ease: "power1.out",
            opacity: 1
        });
        gsap.to("form", {
            duration: 0.75,
            ease: "Elastic.easeIn(0.4)",
            scale: 0
        });
        await new Promise(r => setTimeout(r, 2000));
        gsap.to([".approve-invoice-wrapper", "i:nth-child(2)"], {
            duration: 0.75,
            ease: "Elastic.easeIn(0.4)",
            y: "-100vh"
        });
        await new Promise(r => setTimeout(r, 1500));
        navigate("/dashboard/credit-invoices");
    };

    return (
        <div className="approve-invoice-container">
            <div className="approve-invoice-wrapper">
                <span className="hole"></span>
                <InvoiceField
                    icon="fa-solid fa-cart-shopping"
                    title="عنوان خرید:"
                    value={items}
                />
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
                </div>
            </div>
            {
                deleteInvoice ?
                <i className="fa-solid fa-circle-xmark"></i> :
                <i className="fa-solid fa-circle-check"></i>
            }
            <form onSubmit={handleSelect}>
                <button type="submit" autoFocus={true}>
                    <i className="fa-solid fa-clipboard-check"></i>
                    <span>ثبت فاکتور</span>
                </button>
                <button type="submit" onClick={() => setDeleteInvoice(true)}>
                    <i className="fa-solid fa-trash-can"></i>
                    <span>حذف فاکتور</span>
                </button>
            </form>
        </div>
    );
};


export default ApproveInvoice;