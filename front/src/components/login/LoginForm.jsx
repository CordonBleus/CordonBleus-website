import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginFormStyle from "./LoginForm.module.css"

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URI}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password}),
            });

            console.log(response)
            // Do stuff with response...

            navigate("/room-list")
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={LoginFormStyle.section}>
            <h3 className={LoginFormStyle.formTitle}>Welcome back!</h3>
            <div className={LoginFormStyle.form}>
                <form onSubmit={handleSubmit}>
                    <label className={LoginFormStyle.label} htmlFor="username">Username:</label>
                    <br/>
                    <input
                        type="text"
                        id="username" name="username"
                        value={username}
                        className={LoginFormStyle.fieldUser}
                        placeholder={"username"}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br/>
                    <br/>
                    <label className={LoginFormStyle.label} htmlFor="email">Email:</label>
                    <br/>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder={"example@example.com"}
                        className={LoginFormStyle.fieldemail}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br/>
                    <br/>
                    <label className={LoginFormStyle.label} htmlFor="password">Password:</label>
                    <br/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="**************"
                        className={LoginFormStyle.fieldpassword}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br/>
                    <br/>
                    <div className={LoginFormStyle.buttonFromdiv}>
                        <button className={LoginFormStyle.buttonFrom} type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default LoginForm;
