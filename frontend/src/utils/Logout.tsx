import type { NavigateFunction } from "react-router-dom";
import { Authlogout } from "../login/service/Auth.service";

export async function Logout(navigate: NavigateFunction) {
  try {
    await Authlogout(); // Le dice al backend que borre la cookie
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  } finally {
    window.localStorage.clear();
    navigate("/");
  }
}
