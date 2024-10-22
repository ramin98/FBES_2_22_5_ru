import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashbord() {
  let [userData, setUserData] = useState({});
  let navigate = useNavigate();

  const logoutEvent = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let res = await fetch(`http://localhost:5000/user-data/${localStorage.getItem('userId')}`, {
        method: 'GET'
      })
      let data = await res.json()
      setUserData(data)
    }
    fetchUserData()
 
  },[]);

  return (
    <div>
      <h1>Dashbord</h1>
      <button onClick={logoutEvent}>Logout</button>
      <ul>
        <li>{userData.username}</li>
        <li>{userData.email}</li>
      </ul>
    </div>
  );
}

export default Dashbord;
