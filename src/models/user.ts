import { Avatar } from "../redux/user.Slice";
import { Car } from "./car";

export type User = {
  id: string;
  userName: string;
  email: string;
  location: string;
  // | "Galicia"
  // | "Cantabria"
  // | "Castilla y León"
  // | "Castilla-La Mancha"
  // | "Asturias"
  // | "Pais Vasco"
  // | "Navarra"
  // | "La Rioja"
  // | "Aragón"
  // | "Cataluña"
  // | "Valencia"
  // | "Madrid"
  // | "Extremadura"
  // | "Andalucia"
  // | "Murcia";
  phoneNumber: string;
  password: string;
  avatar: Avatar;
  cars: Car[];
};
