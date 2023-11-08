import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Invoice from "../../components/invoice/Invoice";
import "./MyInvoices.css";


const invoicesInfo = [
    {
        items: "کیک و نوشابه",
        date: "1402/8/15",
        cost: "275000",
        members: [
            {
                value: "user_1",
                label: "user_1"
            },
            {
                value: "user_2",
                label: "user_2"
            },
            {
                value: "user_3",
                label: "user_3"
            },
            {
                value: "user_4",
                label: "user_4"
            },
            {
                value: "user_5",
                label: "user_5"
            }
        ]
    },
    {
        items: "کیک و نوشابه",
        date: "1402/8/15",
        cost: "275000",
        members: [
            {
                value: "user_1",
                label: "user_1"
            },
            {
                value: "user_2",
                label: "user_2"
            }
        ]
    },
    {
        items: "کیک و نوشابه",
        date: "1402/8/15",
        cost: "275000",
        members: [
            {
                value: "user_1",
                label: "user_1"
            },
            {
                value: "user_2",
                label: "user_2"
            },
            {
                value: "user_3",
                label: "user_3"
            },
            {
                value: "user_4",
                label: "user_4"
            }
        ]
    }
];

const MyInvoices = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            invoicesInfo.forEach((x, index) => {
                gsap.to(`.invoice-wrapper:nth-child(${index + 1})`, {
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
    }, []);

    const handleNavigate = async () => {
        invoicesInfo.forEach((x, index) => {
            gsap.to(`.invoice-wrapper:nth-child(${invoicesInfo.length - index})`, {
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
        <main className="my-invoices-container">
            <button className="dashboard-btn" onClick={handleNavigate}>
                <i className="fa-solid fa-house"></i>
                <span>داشبورد</span>
            </button>
            <section className="my-invoices-wrapper">
                {
                    invoicesInfo.map((invoiceInfo, index) => (
                        <Invoice
                            key={index}
                            items={invoiceInfo.items}
                            date={invoiceInfo.date}
                            cost={invoiceInfo.cost}
                            members={invoiceInfo.members}
                        />
                    ))
                }
            </section>
        </main>
    );
};


export default MyInvoices;