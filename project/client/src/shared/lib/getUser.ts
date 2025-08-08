import { jwtDecode } from "jwt-decode";

import { idToken } from "./tokens";

type User = {
  sub: string;
  "cognito:username": string;
};

export default function getUser() {
  const user = jwtDecode<User>(idToken!);

  return {
    id: user.sub,
    username: user["cognito:username"],
  };
}
