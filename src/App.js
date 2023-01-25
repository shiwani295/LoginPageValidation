import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // this help when user already have data in local so no need to enter again email and pass it just loged In automaticly
    const storeLoginUserInformation = localStorage.getItem("isLoggedIn");
    if (storeLoginUserInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password, collage) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1"); //1 for login 0 for logout
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;

//note here we add Authcontext object with peovider property
//navigation home login Auth-context.js theese file for Context API
