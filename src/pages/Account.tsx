//import//
import { Link } from "react-router-dom";
import { useAuthState, AuthStateHook } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { SavedShows } from "../components/SavedShows";

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
    <>
      <div className="w-full text-white">
        <img className="w-full h-[400px] object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="netflix backdrop" />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]" />
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
};
