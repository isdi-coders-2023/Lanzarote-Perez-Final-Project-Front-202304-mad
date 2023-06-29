export type User = {
  id: String;
  userName: String;
  email: String;
  password: String;
  avatar: String;
  cars: Car[];
};

export type Car = {
  carPhoto: String;
  carHP: string;
  carFuel: string;
  carType: string;
};
