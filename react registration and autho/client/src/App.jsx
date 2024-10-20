import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Dashbord from "./components/Dashbord";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/dashbord" element={<Dashbord />} />
      </Routes>
    </>
  );
}

export default App;
