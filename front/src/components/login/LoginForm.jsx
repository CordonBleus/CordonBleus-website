// LoginForm.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {BASE_API_URL, LOGIN} from "../../constants/ConstantsAPI.js";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function LoginForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log(event.target.name.username)
        console.log(BASE_API_URL+LOGIN)
        try {
            axios.post(BASE_API_URL + LOGIN,
                {
                    username: event.target.username.value,
                    email: event.target.email.value,
                    password: event.target.password.value,
                }
            ).then(res => {
                console.log(res.data);
            })
        } catch (error) {
            console.log(error.response.data.error)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <br/>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br/>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
