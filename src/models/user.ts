import { Avatar } from "../redux/user.Slice";
import { Car } from "./car";

export type User = {
  id: string;
  userName: string;
  email: string;
  location: string;
  phoneNumber: string;
  password: string;
  avatar: Avatar;
  cars: Car[];
};
