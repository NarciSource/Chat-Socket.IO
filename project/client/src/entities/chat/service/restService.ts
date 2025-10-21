import axios from "axios";

import { Message, User } from "../model";
import { SearchRequestDTO, SearchResponseDTO, UserDTO } from "../api/dto";
import { dto_to_users } from "./mapper/user";
import { search_response_to_grouped } from "./mapper/message";

const SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

export async function get_users(): Promise<User[]> {
  const { data: dto } = await axios.get<UserDTO>(SERVER_URL + "/users");

  return dto_to_users(dto);
}

export async function search(request_dto: SearchRequestDTO): Promise<Record<string, Message[]>> {
  const { data: dto } = await axios.post<SearchResponseDTO[]>(SERVER_URL + "/search", request_dto);

  return search_response_to_grouped(dto);
}
