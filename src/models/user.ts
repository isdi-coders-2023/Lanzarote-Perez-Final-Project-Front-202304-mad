import { Avatar } from "../redux/user.Slice";

export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  avatar: Avatar;
  cars: Car[];
};

export type Car = {
  carPhoto: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  carHP: string;
};
