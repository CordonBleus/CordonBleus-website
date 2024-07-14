import {useReducer, useState} from "react";
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
    }
}

function RegisterForm() {
    const navigate = useNavigate();
    const [formState, updateForm] = useReducer(
        formStateReducer,
        {
            username: "",
            email: "",
            password: "",
            verifyPassword: "",
        });

    return (
        <div className={styles.section}>
            <h3 className={styles.formTitle}>Welcome back!</h3>
            <form
                // onSubmit={handleSubmit}
                className={styles.form}>
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
                    value={formState.password}
                    className={cls(styles.fieldPassword, styles.formField)}
                    placeholder="Check password"
                    onChange={(e) => updateForm({type: "password", payload: e.target.value})}
                    required
                    minLength={8}
                />
                <button
                    className={styles.buttonFrom}
                    type="submit">Log in
                </button>
            </form>
        </div>

    );
}

export default RegisterForm;