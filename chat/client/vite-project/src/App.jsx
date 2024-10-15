import React, { useState } from 'react';
import Login from './Login';
import ChatWindow from './ChatWindow';
import Register from './Register';

function App() {
   const [token, setToken] = useState(null);
   const [user, setUser] = useState(null);

   const handleLogin = (token, user) => {
       setToken(token);
       setUser(user);
   };

   return (
       <div className="App">
           <h1>Chat Application</h1>
           <Register/>
           {!token ? (
               <Login onLogin={handleLogin} />
           ) : (
               <ChatWindow userId={user.id} />
           )}
       </div>
   );
}

export default App;