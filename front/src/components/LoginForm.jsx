import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <Link to="/room-list">hello</Link>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
