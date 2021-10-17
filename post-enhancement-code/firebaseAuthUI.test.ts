import * as firebase from "firebase/app";
import { popupSignIn, signOut } from "../utils/FirebaseAuthUI";

//mock function(s)
const send: any = jest.fn();

// mock object(s)
const userMock = { displayName: "John Doe" };

// mock modules
jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn((app: any) => {
      return app;
    }),
    GoogleAuthProvider: {
      PROVIDER_ID: "mockid",
    },
  };
});
jest.mock("firebaseui");
jest.mock("firebase/app", () => {
  return {
    initializeApp: jest.fn(() => {
      return {
        onAuthStateChanged: jest.fn((user: any = userMock) => {
          send();
        }),
        signOut: jest.fn(),
      };
    }),
  };
});


describe("firebaseui", () => {
  it("calls send paramater", () => {
    popupSignIn(send);
    expect(send).toHaveBeenCalledTimes(2);
  });
  
  it("initializes firebaseApp", () => {
    const spy = jest.spyOn(firebase, "initializeApp");
    popupSignIn(send);
    expect(spy).toBeCalled();
  });
});
