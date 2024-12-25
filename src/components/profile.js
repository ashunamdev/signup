import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import UploadAndDisplayImage from "./imageUpload";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      // console.log(user);

      // const docRef = doc(db, "Users", user.uid);
      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
        setUserDetails(user);
        // console.log(docSnap.data());
      // } else {
      //   console.log("User is not logged in");
      // }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      // const userDocRef = doc(db, "Users", userDetails.uid);

      // Delete the document
      // await deleteDoc(userDocRef);
      // const ashu = await getDoc(userDocRef)
      
      toast.success("User logged out Successfully", {
        position: "top-right",
      });
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
           {userDetails.firstName ?  <p>First Name: {userDetails.firstName}</p>:null}
            {/* <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
          <UploadAndDisplayImage/>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;
