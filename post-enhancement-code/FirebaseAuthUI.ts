import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
const app: any = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

const popupSignIn = (send: any) => {
  send({ type: "SIGN_IN" });
  // const provider: any = new GoogleAuthProvider();
  auth.onAuthStateChanged((user: any) => {
    if (user) {
      send({ type: "SUCCESS", name: user.displayName });
    } else {
      console.log("user not signed in");
    }
  });

  let ui = new firebaseui.auth.AuthUI(auth);
  ui.start("#firebaseui-auth-container", {
    signInFlow: "popup",
    signInSuccessUrl: "https://localhost:4000",
    signInOptions: [
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        scopes: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ],
        iconUrl:
          "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
      },
    ],
  });
};

const signOut = () => {
  auth.signOut();
};

export { popupSignIn, signOut };
