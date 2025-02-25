import axios from "axios";

import { User } from "../model";

const SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

export async function getUsers(): Promise<User[]> {
  const { data } = await axios.get(SERVER_URL + "/chat/users");
  return data.map((user: string) => new User(user));
}
