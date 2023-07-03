import { MenuOptions } from "../types/menu.options";
import "./App.scss";
import { AppRoutes } from "./app.routes/app.routes";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Menu } from "./menu/menu";
import jwtDecode from "jwt-decode";
import { useUsers } from "../hooks/use.user";
import { User } from "../models/user";
import { useEffect } from "react";

export function App() {
  const { handleLoginWithToken } = useUsers();

  const initialLoginCheck = () => {
    const lsString = localStorage.getItem("store");
    if (!lsString) return console.log("No hay datos en el local storage");

    console.log(lsString);
    const token = lsString;

    const userData: Partial<User> = jwtDecode(token);
    console.log({ userData });
    handleLoginWithToken(userData, token);
  };

  useEffect(() => {
    initialLoginCheck();
  }, []);

  const menuOptions: MenuOptions = [
    { url: "/", label: "Home", protected: false },
    { url: "/garage", label: "Garage", protected: true },
    { url: "/profile", label: "Profile", protected: true },
  ];

  // initialLoginCheck();

  return (
    <>
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
      <AppRoutes></AppRoutes>
      <Footer></Footer>
    </>
  );
}
