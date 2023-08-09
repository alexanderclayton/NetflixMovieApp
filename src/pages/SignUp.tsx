//import//
import { useState, ChangeEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const createAccount = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setMessage("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setDoc(doc(db, "users", email), {
        savedShows: [],
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setMessage("A user with that email address already exists!");
        } else if (error.code === "auth/invalid-email") {
          setMessage("Must enter a valid email!");
        } else if (error.code === "auth/weak-password") {
          setMessage("Password must contain at least 6 characters");
        } else if (error.code === "auth/missing-password") {
          setMessage("Must enter a password!");
        } else {
          console.error(error.code as string);
          setMessage("Error creating user!");
        }
      }
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="netflix backdrop"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen" />
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              {message ? (
                <p className="p-3 bg-red-400 my-2">{message}</p>
              ) : null}
              <form className="w-full flex flex-col py-4">
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="p-3 my-2 bg-gray-700 rounded"
                  onChange={handleEmailChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className="p-3 my-2 bg-gray-700 rounded"
                  onChange={handlePasswordChange}
                />
                <button
                  onClick={createAccount}
                  className="bg-red-600 py-3 my-6 rounded font-bold"
                >
                  Sign Up
                </button>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>
                    <input type="checkbox" name="" id="" className="mr-2" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">
                    Already subscribed to Netflix?
                  </span>{" "}
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
