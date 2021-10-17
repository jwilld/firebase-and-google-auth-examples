import React, { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { userMachine } from "../machines/userMachine";
import { loadAuth, renderSignIn } from "../utils/GoogleAuth";

const GoogleAuth = () => {
  const [current, send] = useMachine(userMachine);
  // wait for dom to load before rendering Google Sign in button
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      loadAuth()
      renderSignIn(send)
    }, 100);
  });

  useEffect(() => {}, []);

  return (
    <div>

      <div id="g-signin2"></div>
      <div id="g-signout"></div>
    </div>
  );
};
export default GoogleAuth;
