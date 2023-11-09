import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Invoice from "../invoice/Invoice";
import "./Invoices.css";


const Invoices = ({invoicesInfo, invoiceType}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            invoicesInfo.forEach((x, index) => {
                gsap.to(`.invoice-wrapper:nth-child(${index + 1})`, {
                    duration: 1,
                    delay: index / 5,
                    ease: "Elastic.easeOut(0.3)",
                    scale: 1
                });
            });
            gsap.to(".dashboard-btn", {
                duration: 0.75,
                delay: 0.75,
                ease: "Elastic.easeOut(0.5)",
                scale: 1
            });
        };
        handleTransition();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleNavigate = async () => {
        invoicesInfo.forEach((x, index) => {
            gsap.to(`.invoice-wrapper:nth-child(${invoicesInfo.length - index})`, {
                duration: 0.75,
                delay: index / 5,
                ease: "power1.out",
                opacity: 0,
                scale: 0
            });
        });
        gsap.to(".dashboard-btn", {
            duration: 0.75,
            ease: "Elastic.easeIn(0.5)",
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
            <section className="invoices-wrapper">
                {
                    invoicesInfo.map((invoiceInfo, index) => (
                        <Invoice
                            key={index}
                            invoiceType={invoiceType}
                            items={invoiceInfo.items}
                            date={invoiceInfo.date}
                            cost={invoiceInfo.cost}
                            members={invoiceType === "credit" ? invoiceInfo.members : null}
                        />
                    ))
                }
            </section>
        </main>
    );
};


export default Invoices;