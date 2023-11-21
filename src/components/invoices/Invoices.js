import React, { useEffect } from "react";
import gsap from "gsap";
import Bars from "../bars/Bars";
import Invoice from "../invoice/Invoice";
import "./Invoices.css";


const Invoices = ({invoicesInfo, invoiceType}) => {

    useEffect(() => {
        const handleTransition = () => {
            invoicesInfo.forEach((x, index) => {
                gsap.to(`.invoice-wrapper:nth-child(${index + 1})`, {
                    duration: 1,
                    delay: index / 5 + 0.3,
                    ease: "power1.out",
                    scale: 1
                });
            });
        };
        handleTransition();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <main className="invoices-container">
            <Bars page={invoiceType} />
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