//import//
import { Link } from "react-router-dom";
import { useAuthState, AuthStateHook } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const Account: React.FC = () => {
  const [user]: AuthStateHook = useAuthState(auth);

  if (!user) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <p className="text-3xl text-gray-300">
            Must be logged in to view account
          </p>
          <div className="flex">
            <Link to="/login" className="text-red-500">
              Go to sign in page
            </Link>
            <p className="text-white px-2">or</p>
            <Link to="/login" className="text-red-500">
              Return to home
            </Link>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <h2>account</h2>
    </div>
  );
};
