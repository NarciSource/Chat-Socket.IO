import { describe, it, expect, vi } from "vitest";
import axios from "axios";

import { User } from "../model";
import { dto_to_user } from "./mapper/user";
import { UserDTO } from "../api/dto";
import { get_users } from "./restService";

vi.mock("axios");
vi.mock("./mapper/user");

describe("restService", () => {
  const SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
  const mockUserDTO: UserDTO = ["John Doe"];
  const mockUser: User = { id: "1", name: "John Doe" };

  it("사용자를 가져오고 올바르게 매핑", async () => {
    (axios.get as any).mockResolvedValue({ data: mockUserDTO });
    (dto_to_user as any).mockReturnValue([mockUser]);

    const users = await get_users();

    expect(axios.get).toHaveBeenCalledWith(SERVER_URL + "/chat/users");
    expect(dto_to_user).toHaveBeenCalledWith(mockUserDTO);
    expect(users).toEqual([mockUser]);
  });

  it("API 호출이 실패하면 오류를 발생", async () => {
    (axios.get as any).mockRejectedValue(new Error("Error"));

    await expect(get_users()).rejects.toThrow("Error");
    expect(axios.get).toHaveBeenCalledWith(SERVER_URL + "/chat/users");
  });
});
