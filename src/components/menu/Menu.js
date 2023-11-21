import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./Menu.css";


const Menu = ({setShowMenu, page}) => {

    useEffect(() => {
        gsap.to(".menu-container", {
            duration: 0.75,
            ease: "power1.out",
            transform: "none"
        });
    }, []);

    const handleHideMenu = async () => {
        gsap.to(".menu-container", {
            duration: 0.75,
            ease: "power1.in",
            transform: "translateX(100vw)"
        });
        await new Promise(r => setTimeout(r, 750));
        setShowMenu(false);
    };

    return (
        <div className="menu-container">
            <i className="fa-solid fa-xmark" onClick={handleHideMenu}></i>
            <div className="menu-wrapper">
                <span className="username">username@</span>
                <Link
                    to="/dashboard"
                    style={{borderBottom: page === "dashboard" && "2px solid black"}}
                >
                    داشبورد
                </Link>
                <Link
                    to="/dashboard/create-invoice"
                    style={{borderBottom: page === "create" && "2px solid black"}}
                >
                    ایجاد فاکتور جدید
                </Link>
                <Link
                    to="/dashboard/credit-invoices"
                    style={{borderBottom: page === "credit" && "2px solid black"}}
                >
                    فاکتورهای طلبکاری
                </Link>
                <Link
                    to="/dashboard/debt-invoices"
                    style={{borderBottom: page === "debt" && "2px solid black"}}
                >
                    فاکتورهای بدهکاری
                </Link>
            </div>
        </div>
    );
};


export default Menu;