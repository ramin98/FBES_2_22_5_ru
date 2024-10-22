import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import { loginForm } from "../store/reducer";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPaasword] = useState("");

  let navigate = useNavigate()

  let { state, dispatch } = useContext(MyContext)

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        loginForm(email, password, navigate, dispatch)

        }}>
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
        <button type="submit">Login</button>
      </form>
      <p>{state.messageElementLogin}</p>
    </div>
  );
}

export default Login;
