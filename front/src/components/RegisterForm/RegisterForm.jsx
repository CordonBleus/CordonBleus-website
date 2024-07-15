import {useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./RegisterForm.module.css";
import {cls} from "../../utils/cls.js";

/**
 * @param {{username:string, email: string, password: string, verifyPassword: string}} prev
 * @param {{type: string, payload: string}} action
 */
function formStateReducer(prev, action) {
    switch (action.type) {
        case "username":
            return {
                ...prev,
                username: action.payload,
            };
        case "email":
            return {
                ...prev,
                email: action.payload,
            };
        case "password":
            return {
                ...prev,
                password: action.payload,
            };
        case "verifyPassword":
            return {
                ...prev,
                verifyPassword: action.payload,
            };
    }
}

function RegisterForm() {
    const navigate = useNavigate();
    const [lastError, updateLastError] = useState("");
    const [formState, updateForm] = useReducer(
        formStateReducer,
        {
            username: "",
            email: "",
            password: "",
            verifyPassword: "",
        });

    useEffect(() => {
            if (localStorage.getItem("username")) navigate("/room-list");
            return () => {
            };
        },
        [navigate]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const response = await fetch(`/api/register`, {
                method: "POST",
                headers: [["Content-Type", "application/json"]],
                body: JSON.stringify(formState),
            });
            if (!response.ok) {
                const reponseData = await response.json();
                updateLastError(reponseData["error"]);
            } else {
                updateLastError("");
                navigate("/");
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={styles.section}>
            <h3 className={styles.formTitle}>Welcome back!</h3>
            <form
                onSubmit={handleSubmit}
                className={styles.form}>
                {lastError && <p className={styles.lastError}>Error: {lastError}</p>}
                <input
                    type="text"
                    name="username"
                    value={formState.username}
                    className={cls(styles.fieldUser, styles.formField)}
                    placeholder="Username"
                    onChange={(e) => updateForm({type: "username", payload: e.target.value})}
                    required
                    minLength={8}
                    maxLength={24}
                />
                <input
                    type="email"
                    name="email"
                    value={formState.email}
                    className={cls(styles.fieldEmail, styles.formField)}
                    placeholder="Email"
                    onChange={(e) => updateForm({type: "email", payload: e.target.value})}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formState.password}
                    className={cls(styles.fieldPassword, styles.formField)}
                    placeholder="Password"
                    onChange={(e) => updateForm({type: "password", payload: e.target.value})}
                    required
                    minLength={8}
                />
                <input
                    type="password"
                    name="password"
                    value={formState.verifyPassword}
                    className={cls(styles.fieldPassword, styles.formField)}
                    placeholder="Check password"
                    onChange={(e) => updateForm({type: "verifyPassword", payload: e.target.value})}
                    required
                    minLength={8}
                />
                <button
                    disabled={formState.password !== formState.verifyPassword}
                    className={styles.buttonFrom}
                    type="submit">Register
                </button>
            </form>
        </div>

    );
}

export default RegisterForm;
