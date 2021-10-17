import React, { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { userMachine } from "../machines/userMachine";
import { popupSignIn, signOut } from "../utils/FirebaseAuthUI";

const GoogleAuth = () => {
  const [current, send] = useMachine(userMachine);
  // wait for dom to load before rendering Google Sign in button
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      popupSignIn(send);
    }, 100);
  });


  return (
    <>
      <div id="firebaseui-auth-container"></div>
      <h1 onClick={signOut}>click to sign out</h1>
    </>
  );
};
export default GoogleAuth;
