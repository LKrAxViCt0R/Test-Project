import React, { useState } from "react";
import AuthContextt from "./AuthContextt";

export const AuthStatee = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <AuthContextt.Provider value={{ isLoggedIn, setisLoggedIn }}>
      {props.children}
    </AuthContextt.Provider>
  );
};
