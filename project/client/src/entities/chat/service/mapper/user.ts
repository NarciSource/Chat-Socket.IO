import { User } from "../../model";
import { UserDTO } from "../../api/dto";

export const dto_to_users = (dto: UserDTO): User[] => {
  return dto.map((user) => new User(user));
};

export const response_payload_to_users = ({ users: dto }: { users: UserDTO }): User[] => {
  return dto_to_users(dto);
};
