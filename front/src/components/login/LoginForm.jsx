import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.css";
import {cls} from "../../utils/cls.js";

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
            if (localStorage.getItem("username")) navigate("/room-list");
            return () => {
            };
        },
        [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                return;
            }

            const responseData = await response.json();

            localStorage.setItem("username", responseData["username"]);

            navigate("/room-list");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.section}>
            <h3 className={styles.formTitle}>Welcome back!</h3>
            <form
                onSubmit={handleSubmit}
                className={styles.form}>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    className={cls(styles.fieldUser, styles.formField)}
                    placeholder={"Username"}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    className={cls(styles.fieldPassword, styles.formField)}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    className={styles.buttonFrom}
                    type="submit">Log in
                </button>
            </form>
        </div>

    );
}

export default LoginForm;
