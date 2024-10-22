import { useContext, useState } from "react";
import { MyContext } from "../App";
import { registerForm } from "../store/reducer";

function Registration() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPaasword] = useState("");

  let {
    state, dispatch
  } = useContext(MyContext)

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        registerForm(username, email, password, dispatch)
        }}>
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
      <p>{state.messageElementRegister}</p>
    </div>
  );
}

export default Registration;
