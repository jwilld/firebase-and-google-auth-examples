import { createMachine, assign } from "xstate";

interface User {
  name: String;
}
export const userMachine = createMachine<User | any>(
  {
    id: "user",
    initial: "idle",
    context: {
      name: "",
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
            actions: ["assignUser", (context) => console.log(context)],
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
      assignUser: assign({
        name: (_, event: any) => event.name,
      }),
    },
  }
);
