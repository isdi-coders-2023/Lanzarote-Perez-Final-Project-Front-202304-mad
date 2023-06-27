import { useDispatch } from "react-redux";
import { UserLogged, login } from "../redux/user.Slice";
import { MenuOptions } from "../types/menu.options";
import "./App.scss";
import { AppRoutes } from "./app.routes/app.routes";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Menu } from "./menu/menu";
import jwtDecode from "jwt-decode";

export function App() {
  const dispatch = useDispatch();

  const initialLoginCheck = () => {
    const lsString = localStorage.getItem("store");

    console.log(lsString);
    if (!lsString) return console.log("No hay datos en el local storage");
    const { token } = JSON.parse(lsString);
    const userData: UserLogged = jwtDecode(token);
    userData.email = "";
    console.log(userData);
    dispatch(login({ token, userData }));
  };

  const menuOptions: MenuOptions = [
    { url: "/", label: "Home", protected: false },
    { url: "/garage", label: "Garage", protected: true },
  ];

  initialLoginCheck();

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
