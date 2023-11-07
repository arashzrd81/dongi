import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Invoice.css";


const Invoice = ({items, date, cost, members}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            gsap.to([".invoice-wrapper", "form"], {
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
        gsap.to(".invoice-wrapper", {
            duration: 0.75,
            ease: "power1.out",
            opacity: 0.3,
        });
        gsap.to(".fa-circle-check", {
            duration: 0.75,
            ease: "power1.out",
            opacity: 1,
        });
        gsap.to("form", {
            duration: 0.75,
            y: "100vh"
        });
        await new Promise(r => setTimeout(r, 2000));
        gsap.to([".invoice-wrapper", ".fa-circle-check"], {
            duration: 0.75,
            ease: "power1.in",
            y: "-100vh"
        });
        await new Promise(r => setTimeout(r, 1500));
        navigate("/dashboard");
    };

    return (
        <div className="invoice-container">
            <div className="invoice-wrapper">
                <span className="hole"></span>
                <div className="field items">
                    <div className="title">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>عنوان خرید:</span>
                    </div>
                    <span>{items}</span>
                </div>
                <div className="field date">
                    <div className="title">
                        <i className="fa-regular fa-calendar-days"></i>
                        <span>تاریخ خرید:</span>
                    </div>
                    <span>{date}</span>
                </div>
                <div className="field cost">
                    <div className="title">
                        <i className="fa-solid fa-tag"></i>
                        <span>مجموع هزینه‌ی انجام شده:</span>
                    </div>
                    <span>{cost}</span>
                </div>
                <div className="field members">
                    <div className="title">
                        <i className="fa-solid fa-users"></i>
                        <span>افراد سهیم (دونگرها):</span>
                    </div>
                    <div className="usernames">
                        {
                            members.map(member => (
                                <div className="username-wrapper">
                                    <span className="username">{member.label}</span>
                                    <span className="circle"></span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <i className="fa-solid fa-circle-check"></i>
            <form onSubmit={handleApprove}>
                <button className="approve-invoice-btn" type="submit" autoFocus={true}>ثبت فاکتور</button>
            </form>
        </div>
    );
};


export default Invoice;