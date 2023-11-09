import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Select from "react-select";
import ApproveInvoice from "../../components/approve-invoice/ApproveInvoice";
import { fakeData } from "../../helper/fakeData";
import { showToast } from "../../helper/showToast";
import "./CreateInvoice.css";


const elements = ["label", ".input"];

const CreateInvoice = () => {

    const [count, setCount] = useState(1);
    const [showInvoice, setShowInvoice] = useState(false);

    const [items, setItems] = useState("");
    const [date, setDate] = useState("");
    const [cost, setCost] = useState("");
    const [members, setMembers] = useState();

    const dateInputRef = useRef();
    const costInputRef = useRef();
    const refs = [dateInputRef, costInputRef];

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            elements.forEach((element, index) => {
                gsap.to(`form:nth-child(1) ${element}`, {
                    duration: 0.75,
                    delay: index / 4,
                    ease: "power1.out",
                    transform: "translateX(-100vw)"
                });
            });
            gsap.to(".continue-btn", {
                duration: 0.75,
                delay: 0.5,
                ease: "power1.out",
                x: 0
            });
            gsap.to(".my-invoices-btn", {
                duration: 0.75,
                delay: 1.5,
                ease: "Elastic.easeOut(0.5)",
                scale: 1
            });
        };
        handleTransition();
    }, []);

    const handleNavigate = async () => {
        gsap.to(".continue-btn", {
            duration: 0.75,
            ease: "power1.in",
            y: "100vh"
        });
        const temp = [...elements];
        temp.reverse().forEach((element, index) => {
            gsap.to(`form:nth-child(${count}) ${element}`, {
                duration: 0.75,
                delay: index ? 0.66 : 0.33,
                ease: "power1.in",
                y: "100vh"
            });
        });
        gsap.to(".my-invoices-btn", {
            duration: 0.75,
            ease: "Elastic.easeIn(0.5)",
            scale: 0
        });
        await new Promise(r => setTimeout(r, 2000));
        navigate("/dashboard/credit-invoices");
    };

    const handleContinue = async e => {
        e.preventDefault();
        if (count === 1 && !/^[\u0600-\u06FF\s]{2,50}$/.test(items)) {
            showToast("!لطفا متن معتبر وارد کنید");
        } else if (count === 2 && !/^\d{4}[/]\d{1,2}[/]\d{1,2}$/.test(date)) {
            showToast("!لطفا تاریخ معتبر وارد کنید");
        } else if (count === 3 && !/^\d+$/.test(cost)) {
            showToast("!لطفا عدد معتبر وارد کنید");
        } else if (count === 4 && !members) {
            showToast("!باید حداقل یک عضو را انتخاب کنید");
        } else {
            elements.forEach((element, index) => {
                gsap.to(`form:nth-child(${count}) ${element}`, {
                    duration: 0.75,
                    delay: index / 3,
                    ease: "power1.in",
                    y: "-100vh"
                });
            });
            if (count === 4) {
                gsap.to(".see-invoice-btn", {
                    duration: 0.75,
                    delay: 0.66,
                    ease: "power1.in",
                    y: "-100vh"
                });
                gsap.to(".my-invoices-btn", {
                    duration: 0.75,
                    ease: "Elastic.easeIn(0.5)",
                    scale: 0
                });
                await new Promise(r => setTimeout(r, 2000));
                setShowInvoice(true);
            } else {
                if (count === 1 || count === 2) {
                    refs[count-1].current.focus();
                } else {
                    gsap.to(".continue-btn", {
                        duration: 0.75,
                        delay: 0.66,
                        ease: "power1.in",
                        y: "-100vh"
                    });
                    gsap.to(".see-invoice-btn", {
                        duration: 0.75,
                        delay: 1.25,
                        ease: "power1.out",
                        transform: "translateX(-100vw)"
                    });
                }
                elements.forEach((element, index) => {
                    gsap.to(`form:nth-child(${count + 1}) ${element}`, {
                        duration: 0.75,
                        delay: index ? 1 : 0.75,
                        ease: "power1.out",
                        transform: "translateX(-100vw)"
                    });
                });
                setCount(count + 1);
            }
        }
    };

    return (
        <>
            {
                showInvoice ?
                <ApproveInvoice items={items} date={date} cost={cost} members={members} /> :
                <main className="create-invoice-container">
                    <button className="my-invoices-btn" onClick={handleNavigate}>
                        <i className="fa-solid fa-clipboard-list"></i>
                        <span>فاکتورهای من</span>
                    </button>
                    <section className="create-invoice-wrapper">
                        <form onSubmit={handleContinue}>
                            <label>اقلامی که خریدی:</label>
                            <input
                                className="input"
                                type="text"
                                value={items}
                                onChange={e => setItems(e.target.value)}
                                placeholder="مثلا کیک و کادوی تولد"
                            />
                        </form>
                        <form onSubmit={handleContinue}>
                            <label>تاریخ خریدی که انجام دادی:</label>
                            <input
                                ref={dateInputRef}
                                className="input"
                                type="text"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                placeholder="مثلا 1402/8/11"
                            />
                        </form>
                        <form onSubmit={handleContinue}>
                            <label>مجموع هزینه‌ای که کردی: (به تومان)</label>
                            <input
                                ref={costInputRef}
                                className="input"
                                type="text"
                                value={cost}
                                onChange={e => setCost(e.target.value)}
                                placeholder="مثلا 825000"
                            />
                        </form>
                        <form onSubmit={handleContinue}>
                            <label>کسایی که باید دونگ بدن:</label>
                            <Select
                                className="input"
                                value={members}
                                options={fakeData[0].members}
                                onChange={setMembers}
                                placeholder=""
                                isMulti={true}
                                isSearchable={false}
                                styles={{
                                    control: () => ({
                                        padding: "0.4rem",
                                        border: "2px solid var(--color-2)",
                                        borderRadius: "10px"
                                    }),
                                    indicatorsContainer: () => ({
                                        display: "none"
                                    }),
                                    menu: () => ({
                                        position: "absolute"
                                    }),
                                    multiValue: () => ({
                                        width: "fit-content",
                                        paddingRight: "5px",
                                        paddingLeft: "10px",
                                        borderRadius: "10px",
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        alignItems: "center",
                                        columnGap: "5px",
                                        fontWeight: "bold",
                                        color: "var(--color-1)",
                                        backgroundColor: "var(--color-2)"
                                    }),
                                    multiValueLabel: () => ({
                                        width: "fit-content",
                                        fontSize: "0.8rem"
                                    }),
                                    multiValueRemove: () => ({
                                        width: "fit-content",
                                        marginTop: "5px",
                                        cursor: "pointer"
                                    }),
                                    noOptionsMessage: () => ({
                                        display: "none"
                                    }),
                                    option: (defaultStyles, state) => ({
                                        ...defaultStyles,
                                        padding: "0.6rem",
                                        textAlign: "left",
                                        cursor: "pointer",
                                        fontSize: "0.8rem",
                                        color: state.isFocused ? "var(--color-1)" : "var(--color-2)",
                                        backgroundColor: state.isFocused ? "var(--color-2)" : "var(--color-1)",
                                        ":hover": {
                                            color: "var(--color-1)",
                                            backgroundColor: "var(--color-2)"
                                        }
                                    }),
                                    valueContainer: () => ({
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        flexWrap: "wrap",
                                        gap: "5px"
                                    })
                                }}
                            />
                            <button className="see-invoice-btn" onClick={handleContinue}>دیدن فاکتور</button>
                        </form>
                        <button className="continue-btn" onClick={handleContinue}>ادامه</button>
                    </section>
                </main>
            }
        </>
    );
};


export default CreateInvoice;