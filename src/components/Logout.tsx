//import//
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

export const Logout: React.FC = () => {
  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      navigate(".");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.code as string);
      }
    }
  };
  return (
    <>
      <button
        onClick={logout}
        className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
      >
        Logout
      </button>
    </>
  );
};
