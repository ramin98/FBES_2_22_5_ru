export let initialState = {
  messageElementLogin: "",
  messageElementRegister: "",
};

export async function registerForm(username, email, password, dispatch) {
  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "REGISTER", payload: data.message });
    } else {
      dispatch({
        type: "REGISTER",
        payload: data.message || "Registration failed",
      });
    }
  } catch (err) {
    dispatch({ type: "REGISTER", payload: err.message });
  }
}

export async function loginForm(email, password, navigate, dispatch) {
  console.log(email, password);

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      let token = localStorage.getItem("token");

      const dashboardResponse = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json();
        localStorage.setItem("userId", dashboardData.id);
        navigate("/dashbord");
      }
    } else {
      dispatch({ type: "LOGIN", payload: data.message || "Login failed" });
    }
  } catch (err) {
    dispatch({ type: "LOGIN", payload: err.message });
  }
}

export function reducer(state, action) {
  if (action.type === "REGISTER") {
    return { ...state, messageElementRegister: action.payload };
  } else if (action.type === "LOGIN") {
    return { ...state, messageElementLogin: action.payload };
  }

  return state;
}
