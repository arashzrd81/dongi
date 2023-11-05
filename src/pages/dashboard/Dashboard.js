import React, { useEffect } from "react";
import gsap from "gsap";
import "./Dashboard.css";


const elements = [".creditor-btn", ".debtor-btn"];

const Dashboard = () => {

    useEffect(() => {
        const handleTransition = () => {
            elements.forEach((element, index) => {
                gsap.from(element, {
                    duration: 1.2,
                    ease: "power1.out",
                    x: index ? "-100vw" : "100vw",
                    opacity: 0
                });
            });
        };
        handleTransition();
    }, []);

    const handleClick = async e => {
        let temp = [...elements];
        temp = e.target.className === "creditor-btn" ? [...temp] : [...temp.reverse()];
        temp.forEach((element, index) => {
            gsap.to(element, {
                duration: 0.8,
                delay: index / 3,
                ease: "power1.in",
                y: "-100vh",
                opacity: 0
            });
        });
    };

    return (
        <main className="dashboard-container">
            <section className="dashboard-wrapper">
                <button className="creditor-btn" onClick={handleClick}>بخش طلبکاری</button>
                <button className="debtor-btn" onClick={handleClick}>بخش بدهکاری</button>
            </section>
        </main>
    );
};


export default Dashboard;