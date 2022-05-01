import React, { useEffect, useState } from "react";
import { auth, getUser } from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getUser();
        // console.log(userDoc);
        setUser(userDoc);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
