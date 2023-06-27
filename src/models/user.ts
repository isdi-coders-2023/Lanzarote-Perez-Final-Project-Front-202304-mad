export type User = {
  id: String;
  userName: String;
  email: String;
  password: String;
  driverPhoto: String;
  cars: Car[];
};

export type Car = {
  carPhoto: String;
  carHP: string;
  carFuel: string;
  carType: string;
};
