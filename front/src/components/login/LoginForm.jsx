import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginFormStyle from "./LoginForm.module.css"

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userUuid = localStorage.getItem("userUuid")
        let response = undefined
        if (userUuid == null) {
            response = await axios.post(
                "http://127.0.0.1:3000/login",
                {
                    "username": "test",
                    "email": "test@gmail.com",
                    "password": "test",
                    "socketId": "random"
                }
            )
            localStorage.setItem("userUuid", response.data.userUuid)
        } else {
            response = await axios.post(
                "http://127.0.0.1:3000/login",
                {
                    "userUuid": userUuid
                }
            )
            console.log("userUuid: ", userUuid)
            console.log(response)
            if (response.status === 404) {
                localStorage.removeItem("userUuid")
                console.error("Wrong uuid for the user")
                return
            }
        }
        navigate("/room-list")
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
