import { getProfile } from "../utils/GoogleAuth";

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

test("returns user object", async () => {
  const user = await getProfile(myPromise).then((resolve: any) => {
    return resolve;
  });
  expect(user).toBe("foo");
});
