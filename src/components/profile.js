import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import UploadAndDisplayImage from "./imageUpload";
import "../css/Profile.css";
import USERICON from "../assets/user-svgrepo-com.svg";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      setUserDetails(user);
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(userDetails, "user details");
  async function handleLogout() {
    try {
      await auth.signOut();
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {userDetails?.photoURL ? (
                <img
                  src={userDetails?.photoURL}
                  width={"40%"}
                  style={{ borderRadius: "50%", margin: "2rem 0" }}
                  alt=""
                />
              ) : (
                <img
                  src={USERICON}
                  width={"100px"}
                  style={{
                    borderRadius: "50%",
                    margin: "2rem 0",
                    border: "5px solid #35c5a8",
                    padding: "5px",
                  }}
                  alt=""
                />
              )}
            </div>
            <h3>Welcome {userDetails.firstName}</h3>
            <div>
              <p>Email: {userDetails.email}</p>
              {userDetails.displayName ? (
                <p> Name: {userDetails.displayName}</p>
              ) : null}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn btn-primary logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          <UploadAndDisplayImage />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;
