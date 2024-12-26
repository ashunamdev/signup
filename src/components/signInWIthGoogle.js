import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      if (result.user) {
        try {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "",
          });
        } catch (error) {
          console.error("Error writing document: ", error);
        }
        toast.success("User logged in Successfully", {
          position: "top-right",
        });
        window.location.href = "/profile";
      }
    });
  }
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <button className="google-signin-button" onClick={googleLogin}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20"
          height="20"
          className="google-icon"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.03 0 5.7 1.04 7.82 2.74l5.78-5.77C33.68 3.14 29.13 1.5 24 1.5 14.64 1.5 6.8 7.65 3.68 15.85l6.96 5.41C12.3 14.12 17.7 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.5 24c0-1.41-.14-2.77-.39-4.08H24v8.16h12.72c-.55 2.86-2.14 5.27-4.49 6.91l6.96 5.41C42.48 36.41 46.5 30.81 46.5 24z"
          />
          <path
            fill="#FBBC05"
            d="M10.64 27.55c-.36-1.05-.57-2.17-.57-3.36s.21-2.31.57-3.36L3.68 15.85A22.49 22.49 0 0 0 1.5 24c0 3.57.85 6.95 2.37 9.91l6.77-5.41z"
          />
          <path
            fill="#4285F4"
            d="M24 46.5c5.97 0 10.97-1.97 14.62-5.37l-6.96-5.41c-2.09 1.36-4.8 2.17-7.66 2.17-6.3 0-11.7-4.62-13.36-10.91l-6.96 5.41C6.8 40.35 14.64 46.5 24 46.5z"
          />
        </svg>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
export default SignInwithGoogle;
