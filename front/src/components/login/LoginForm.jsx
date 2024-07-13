import {useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginFormStyle from "./LoginForm.module.css";

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

            console.log(response);
            // Do stuff with response...

            navigate("/room-list");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={LoginFormStyle.section}>
            <h3 className={LoginFormStyle.formTitle}>Welcome back!</h3>
            <form
                onSubmit={handleSubmit}
                className={LoginFormStyle.form}>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    className={LoginFormStyle.fieldUser}
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
                    className={LoginFormStyle.fieldpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    className={LoginFormStyle.buttonFrom}
                    type="submit">Log in
                </button>
            </form>
        </div>

    );
}

export default LoginForm;
