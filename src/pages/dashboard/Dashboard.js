import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Bars from "../../components/bars/Bars";
import "./Dashboard.css";


const elements = [".creditor-btn", ".debtor-btn"];

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = async () => {
            elements.forEach(element => {
                gsap.to(element, {
                    duration: 1,
                    delay: 0.3,
                    ease: "Elastic.easeOut(0.5)",
                    scale: 1
                });
            });
        };
        handleTransition();
    }, []);

    const handleSelect = async e => {
        let temp = [...elements];
        temp = e.target.className === "creditor-btn" ? [...temp] : [...temp.reverse()];
        gsap.to(temp[0], {
            duration: 0.75,
            ease: "power4.out",
            borderRadius: "50%",
            color: "white",
            backgroundColor: "#E73213"
        });
        await new Promise(r => setTimeout(r, 750));
        temp.forEach((element, index) => {
            gsap.to(element, {
                duration: 1,
                delay: index / 2,
                ease: "Elastic.easeIn(0.5)",
                y: "-100vh"
            });
        });
        await new Promise(r => setTimeout(r, 2000));
        if (e.target.className === "creditor-btn") {
            navigate("/dashboard/create-invoice");
        } else {
            navigate("/dashboard/debt-invoices");
        }
    };

    return (
        <main className="dashboard-container">
            <Bars page="dashboard" />
            <section className="dashboard-wrapper">
                <button className="creditor-btn" onClick={handleSelect}>بخش طلبکاری</button>
                <button className="debtor-btn" onClick={handleSelect}>بخش بدهکاری</button>
            </section>
        </main>
    );
};


export default Dashboard;