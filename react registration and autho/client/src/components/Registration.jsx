import { useState } from "react";

function Registration() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPaasword] = useState("");
  let [messageElement, setMessageElement] = useState("");

  const registerForm = async (ev) => {
    ev.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageElement(data.message);
      } else {
        setMessageElement(data.message || "Registration failed");
      }
    } catch (err) {
      setMessageElement("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={registerForm}>
        <input
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="Username"
          required
        />
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

export default Registration;
