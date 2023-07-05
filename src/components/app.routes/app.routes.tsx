import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Profile } from "../profile/profile";
import UserDetails from "../userDetails/userdetails";
import { EditCarForm } from "../editcar/editcar";

const Home = lazy(() => import("../home/home"));
const Login = lazy(() => import("../login/login"));
const Register = lazy(() => import("../register/register"));
const ErrorPage = lazy(() => import("../errorPage/errorPage"));
const Garage = lazy(() => import("../garage/garage"));
export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<Home></Home>}></Route>
        <Route path={"/login"} element={<Login></Login>}></Route>
        <Route path={"/register"} element={<Register></Register>}></Route>
        <Route path={"/garage"} element={<Garage></Garage>}></Route>
        <Route
          path={"/editcar/:id"}
          element={<EditCarForm></EditCarForm>}
        ></Route>
        <Route
          path={"/userDetails/:id"}
          element={<UserDetails></UserDetails>}
        ></Route>
        <Route path={"/profile"} element={<Profile></Profile>}></Route>
        <Route path={"/*"} element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </Suspense>
  );
}
