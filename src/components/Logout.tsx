//import//
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

export const Logout: React.FC = () => {
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      console.log("success!");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.code as string);
      }
    }
  };
  return (
    <>
      <button onClick={logout} className="text-white pr-4">Logout</button>
    </>
  );
};
