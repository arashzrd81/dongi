import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import CreditInvoice from "../credit-invoice/CreditInvoice";
import "./ApproveInvoice.css";


const ApproveInvoice = ({items, date, cost, members}) => {

    const [deleteInvoice, setDeleteInvoice] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            gsap.to([".credit-invoice-wrapper", "form"], {
                duration: 1,
                ease: "power1.out",
                opacity: 1,
                scale: 1
            });
        };
        handleTransition();
    }, []);

    const handleApprove = async e => {
        e.preventDefault();
        gsap.to(".credit-invoice-wrapper", {
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
            y: "100vh"
        });
        await new Promise(r => setTimeout(r, 2000));
        gsap.to([".credit-invoice-wrapper", "i:nth-child(2)"], {
            duration: 0.75,
            ease: "power1.in",
            y: "-100vh"
        });
        await new Promise(r => setTimeout(r, 1500));
        navigate("/dashboard/credit-invoices");
    };

    return (
        <div className="approve-invoice-container">
            <CreditInvoice items={items} date={date} cost={cost} members={members} />
            {
                deleteInvoice ?
                <i className="fa-solid fa-circle-xmark"></i> :
                <i className="fa-solid fa-circle-check"></i>
            }
            <form onSubmit={handleApprove}>
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