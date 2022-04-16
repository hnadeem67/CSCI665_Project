import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  logout,
} from "../../utils/authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./LoginOrRegister.styles.css";

function LoginOrRegister() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // loading screen?
      return;
    }
    if (error) {
      console.error(error.message);
    }
    if (user) navigate("/events");
  }, [user, loading, error, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        {user ? (
          <div>
            <h1>Welcome, {user.displayName}</h1>
            <button className="login__btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <button
            className="login__btn login__google"
            onClick={signInWithGoogle}
          >
            Login or Register with Google
          </button>
        )}
      </div>
    </div>
  );
}
export default LoginOrRegister;
