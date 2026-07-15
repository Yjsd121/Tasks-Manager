import type { NavigateFunction } from "react-router-dom";

export function Logout(navigate: NavigateFunction) {
  window.localStorage.clear();
  navigate("/");
}
