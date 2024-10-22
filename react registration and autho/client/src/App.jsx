import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Dashbord from "./components/Dashbord";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./store/reducer";


export const MyContext = createContext()

function App() {
  let [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <MyContext.Provider value={{
      state, dispatch
    }}>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/dashbord" element={<Dashbord />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
