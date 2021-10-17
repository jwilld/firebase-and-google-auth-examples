import { createMachine, assign } from "xstate";

interface User {
  name: String;
  email: String;
  authToken: String;
}
export const userMachine = createMachine<User | any>(
  {
    id: "user",
    initial: "idle",
    context: {
      name: "",
      email: "",
      authToken: "",
    },

    // state definitions
    states: {
      idle: {
        // entry: ["load"],
        on: {
          SIGN_IN: {
            target: "authenticate",
          },
        },
      },
      authenticate: {
        on: {
          SUCCESS: {
            actions: ["assignUser", "printUser"],
          },
          REJECT: {
            target: "idle",
          },
        },
      },
      signedIn: {
        entry: "printUser",
      },
    },
  },
  {
    actions: {
      // load: () => {
      //   // wait for content to load then set timeout
      //   document.addEventListener("DOMContentLoaded", (e) => {
      //     setTimeout(loadAuth, 100);
      //   });
      // },
      printUser: () => {
        console.log(userMachine.context);
      },
      assignUser: assign({
        name: (_, event: any) => event.name,
        email: (_, event: any) => event.email,
        authToken: (_, event: any) => event.authToken,
      }),
    },
  }
);
