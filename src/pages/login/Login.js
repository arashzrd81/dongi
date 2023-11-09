import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { showToast } from "../../helper/showToast";
import "./Login.css";


const elements = ["h1", "input:nth-child(1)", "input:nth-child(2)", "button"];
const positions = ["-100vh", "100vw", "-100vw", "100vh"];

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const handleTransition = () => {
            elements.forEach((element, index) => {
                gsap.to(element, {
                    duration: 1,
                    delay: 1.5,
                    ease: "power1.out",
                    [index === 0 || index === 3 ? "y" : "x"]: 0
                });
            });
        };
        handleTransition();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!username || !password) {
            showToast("!لطفا همه‌ی فیلدها رو پر کنید");
        } else {
            localStorage.setItem("userAuth", "true");
            elements.forEach((element, index) => {
                gsap.to(element, {
                    duration: 0.75,
                    ease: "power1.in",
                    [index === 0 || index === 3 ? "y" : "x"]: positions[index]
                });
            });
            await new Promise(r => setTimeout(r, 1500));
            navigate("/dashboard", {
                replace: true
            });
        }
    };

    return (
        <main className="login-container">
            <section className="login-wrapper">
                <h1>به دنگ و دونگ خوش اومدی</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoFocus={true}
                        placeholder="نام کاربری"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="رمز عبور"
                    />
                    <button type="submit">ورود</button>
                </form>
            </section>
        </main>
    );
};


export default Login;