import { useState } from "react";

function Login() {
    let [email, setEmail] = useState("");
    let [password, setPaasword] = useState("");
    let [messageElement, setMessageElement] = useState("");
  
    const loginForm = async (ev) => {
      ev.preventDefault();

      try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            localStorage.setItem('token', data.token);
            setMessageElement('Login successful!')
        } else {
            setMessageElement(data.message || 'Login failed')
        }
    } catch (err) {
        setMessageElement('Error: ' + err.message)
    }
    };
  
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={loginForm}>
          <input
            onChange={(ev) => setEmail(ev.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            onChange={(ev) => setPaasword(ev.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>{messageElement}</p>
      </div>
    );
  }
  
  export default Login
  