//imports//
import React from "react";
import { Link } from "react-router-dom";
import { useAuthState, AuthStateHook } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Logout } from "./Logout";

export const Navbar: React.FC = () => {
  const [user]: AuthStateHook = useAuthState(auth)
  console.log("email", user?.email)

  return (
    <div className="flex items-center justify-between p-4 z-[100] absolute w-full">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {!user ? (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/account">
            <button className="text-white pr-4">Account</button>
          </Link>
          <Logout />
        </div>
      )}
    </div>
  );
};
