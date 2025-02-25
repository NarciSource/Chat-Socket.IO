import { User } from "../../model";
import { UserDTO } from "../../api/dto";

export const dto_to_user = (dto: UserDTO): User[] => {
  return dto.map((user) => new User(user));
};
