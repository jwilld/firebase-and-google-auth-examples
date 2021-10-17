/* global gapi */
// Google auth functions go here

// Go to https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams for Google auth documentation
export interface Auth {
  signIn(): Promise<Object>;
  currentUser: any;
}
// extends window interface with gapi property
declare global {
  interface Window {
    gapi: any;
  }
}
// set window.gapi (looks repetitive, but removes lint and test errors) see the issue below for more info
//stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript

https: window.gapi = window.gapi;

// id to connect to google API(maybe hide it later)
const clientId: any = process.env.CLIENT_ID;
// Google sign out
const signOut = () => {
  let auth2 = window.gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => console.log("User signed out"));
  let signOutContainer = document.getElementById("g-signout");
  // remove sign out text once signed out
  while (signOutContainer?.firstChild) {
    signOutContainer.removeChild(signOutContainer.firstChild);
  }
};

const renderSignOut = () => {
  // sign out button elements
  let fragment = new DocumentFragment();
  let signOutTextElement = document.createElement("h4");
  signOutTextElement.innerText = "Sign Out";
  signOutTextElement.setAttribute("id", "sign-out-text");
  fragment.appendChild(signOutTextElement);

  // signout button
  let buttonWrapper = window?.document?.getElementById("g-signout");
  buttonWrapper?.appendChild(fragment);

  // add sign out function to sign out button
  buttonWrapper?.addEventListener("click", (e) => {
    e.preventDefault();
    signOut();
  });
};

const renderSignIn = (send: any) => {
  send({ type: "SIGN_IN" });
  window.gapi.signin2.render("g-signin2", {
    scope: "email",
    width: "230px",
    height: "45px",
    longtitle: true,
    theme: "light",
    onsuccess: (googleUser: any) => {
      const profile: any = googleUser.getBasicProfile();
      console.log("Google login success");
      // console.log(googleUser.getAuthResponse().id_token);
      // const profile: any = googleUser.getBasicProfile();
      // console.log(profile.getName());
      // console.log(profile.getEmail());
      send({
        type: "SUCCESS",
        name: profile.getName(),
        email: profile.getEmail(),
        authToken: googleUser.getAuthResponse().id_token,
      });
      renderSignOut();
    },
    onfailure: () => {
      console.log("failure");
    },
  });
};

// initializes Google auth object
const loadAuth = async () => {
  let result;
  await window.gapi.load("auth2", function () {
    window.gapi.auth2
      .init({
        client_id: clientId,
        scope: "profile email",
        cookie_policy: "none",
      })
      .then((res: any) => {
        result = res;
      })
      .catch((e: any) => console.log(e));
  });
  // renderSignIn();
  return result;
};

const getProfile = (auth: any) => {
  const user = auth?.then((res: any) => {
    return res;
  });
  return user;
};

export { loadAuth, getProfile, renderSignIn };
