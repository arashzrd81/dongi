import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import CreditInvoice from "../credit-invoice/CreditInvoice";
import DebtInvoice from "../debt-invoice/DebtInvoice";
import "./Invoices.css";


const Invoices = ({invoicesInfo, invoiceType}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            invoicesInfo.forEach((x, index) => {
                gsap.to(`.${invoiceType}-invoice-wrapper:nth-child(${index + 1})`, {
                    duration: 1,
                    delay: index / 5,
                    ease: "power1.out",
                    opacity: 1,
                    scale: 1
                });
            });
            gsap.to(".dashboard-btn", {
                duration: 1,
                ease: "power1.out",
                opacity: 1,
                scale: 1
            });
        };
        handleTransition();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleNavigate = async () => {
        invoicesInfo.forEach((x, index) => {
            gsap.to(`.${invoiceType}-invoice-wrapper:nth-child(${invoicesInfo.length - index})`, {
                duration: 0.75,
                delay: index / 5,
                ease: "power1.in",
                opacity: 0,
                scale: 0
            });
        });
        gsap.to(".dashboard-btn", {
            duration: 0.75,
            ease: "power1.in",
            opacity: 0,
            scale: 0
        });
        await new Promise(r => setTimeout(r, 2000));
        navigate("/dashboard");
    };

    return (
        <main className="invoices-container">
            <button className="dashboard-btn" onClick={handleNavigate}>
                <i className="fa-solid fa-house"></i>
                <span>داشبورد</span>
            </button>
            <section className={invoiceType + "-invoices-wrapper"}>
                {
                    invoiceType === "credit" ?
                    invoicesInfo.map((invoiceInfo, index) => (
                        <CreditInvoice
                            key={index}
                            items={invoiceInfo.items}
                            date={invoiceInfo.date}
                            cost={invoiceInfo.cost}
                            members={invoiceInfo.members}
                        />
                    )) :
                    invoicesInfo.map((invoiceInfo, index) => (
                        <DebtInvoice
                            key={index}
                            items={invoiceInfo.items}
                            date={invoiceInfo.date}
                            cost={invoiceInfo.cost}
                        />
                    ))
                }
            </section>
        </main>
    );
};


export default Invoices;