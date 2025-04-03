import axios from "axios";

import { User } from "../model";
import { UserDTO } from "../api/dto";
import { dto_to_user } from "./mapper/user";

const SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

export async function get_users(): Promise<User[]> {
  const { data: dto } = await axios.get<UserDTO>(SERVER_URL + "/users");

  return dto_to_user(dto);
}
