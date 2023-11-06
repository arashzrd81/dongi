import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Dashboard.css";


const elements = [".creditor-btn", ".debtor-btn"];

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            elements.forEach(element => {
                gsap.to(element, {
                    duration: 1,
                    ease: "power1.out",
                    y: 0
                });
            });
        };
        handleTransition();
    }, []);

    const handleSelect = async e => {
        let temp = [...elements];
        temp = e.target.className === "creditor-btn" ? [...temp] : [...temp.reverse()];
        temp.forEach((element, index) => {
            gsap.to(element, {
                duration: 0.75,
                delay: index / 3,
                ease: "power1.in",
                y: "-100vh",
                opacity: 0
            });
        });
        await new Promise(r => setTimeout(r, 1000));
        if (e.target.className === "creditor-btn") {
            navigate("/dashboard/create-invoice");
        }
    };

    return (
        <main className="dashboard-container">
            <section className="dashboard-wrapper">
                <button className="creditor-btn" onClick={handleSelect}>بخش طلبکاری</button>
                <button className="debtor-btn" onClick={handleSelect}>بخش بدهکاری</button>
            </section>
        </main>
    );
};


export default Dashboard;