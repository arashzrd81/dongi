import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Select from "react-select";
import { showToast } from "../../helper/showToast";
import "./CreateInvoice.css";


const elements = ["label", ".input"];
const users = [
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
];

const CreateInvoice = () => {

    const [count, setCount] = useState(0);
    
    const [items, setItems] = useState("");
    const [date, setDate] = useState("");
    const [cost, setCost] = useState("");
    const [members, setMembers] = useState();

    const itemsInputRef = useRef();
    const dateInputRef = useRef();
    const costInputRef = useRef();
    const refs = [dateInputRef, costInputRef];

    useEffect(() => {
        const handleTransition = () => {
            elements.forEach((element, index) => {
                gsap.to(`form:nth-child(1) ${element}`, {
                    duration: 1,
                    delay: index ? 1.25 : 1,
                    ease: "power1.out",
                    transform: "translateX(-100vw)"
                });
            });
            gsap.to(".continue-btn", {
                duration: 1,
                delay: 1.5,
                ease: "power1.out",
                x: 0
            });
            gsap.to(".my-invoices-btn", {
                duration: 1,
                delay: 2.5,
                ease: "power1.out",
                opacity: 1
            });
        };
        handleTransition();
        itemsInputRef.current.focus();
    }, []);

    const handleContinue = async e => {
        e.preventDefault();
        if (count === 0 && !/^[\u0600-\u06FF\s]{2,50}$/.test(items)) {
            showToast("!لطفا متن معتبر وارد کنید");
        } else if (count === 1 && !/^\d{4}[/]\d{1,2}[/]\d{1,2}$/.test(date)) {
            showToast("!لطفا تاریخ معتبر وارد کنید");
        } else if (count === 2 && !/^\d+$/.test(cost)) {
            showToast("!لطفا عدد معتبر وارد کنید");
        } else if (count === 3 && !members) {
            showToast("!باید حداقل یک عضو را انتخاب کنید");
        } else {
            elements.forEach((element, index) => {
                gsap.to(`form:nth-child(${count + 1}) ${element}`, {
                    duration: 0.75,
                    delay: index / 3,
                    ease: "power1.in",
                    y: "-100vh",
                    opacity: 0
                });
            });
            if (count === 3) {
                gsap.to(".see-invoice-btn", {
                    duration: 0.75,
                    delay: 0.66,
                    ease: "power1.in",
                    y: "-100vh",
                    opacity: 0
                });
            } else {
                if (count === 0 || count === 1) {
                    refs[count].current.focus();
                } else {
                    gsap.to(".continue-btn", {
                        duration: 0.75,
                        delay: 0.66,
                        ease: "power1.in",
                        y: "-100vh",
                        opacity: 0
                    });
                    gsap.to(".see-invoice-btn", {
                        duration: 1,
                        delay: 1.25,
                        ease: "power1.out",
                        transform: "translateX(-100vw)"
                    });
                }
                elements.forEach((element, index) => {
                    gsap.to(`form:nth-child(${count + 2}) ${element}`, {
                        duration: 1,
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
        <main className="create-invoice-container">
            <button className="my-invoices-btn">
                <i className="fa-solid fa-clipboard-list"></i>
                <span>فاکتورهای من</span>
            </button>
            <section className="create-invoice-wrapper">
                <form onSubmit={handleContinue}>
                    <label>اقلامی که خریدی:</label>
                    <input
                        ref={itemsInputRef}
                        className="input"
                        type="text"
                        value={items}
                        onChange={e => setItems(e.target.value)}
                        placeholder="مثلا کیک و نوشابه"
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
                        placeholder="مثلا 1402/8/15"
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
                        placeholder="مثلا 275000"
                    />
                </form>
                <form onSubmit={handleContinue}>
                    <label>کسایی که باید دونگ بدن:</label>
                    <Select
                        className="input"
                        value={members}
                        options={users}
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
    );
};


export default CreateInvoice;