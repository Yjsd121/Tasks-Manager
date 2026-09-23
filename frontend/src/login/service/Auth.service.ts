import { API_URL } from "@/service/Api";

export async function Authlogin(Email: string, pass: string) {
  const response = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Incluir cookies
    body: JSON.stringify({
      email: Email,
      password: pass,
    }),
  });

  return await response;
}

export async function Authlogout() {
  const response = await fetch(`${API_URL}/Auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Incluir cookies para que el backend la limpie
  });
  return response;
}

export async function GetMe() {
  const response = await fetch(`${API_URL}/Adminview/Me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Incluir cookies
  });

  return response;
}

interface changePass {
  Password: string;
  confirmPass: string;
}

export async function changefirstPass(Data: changePass) {
  console.log(Data);
  const response = await fetch(`${API_URL}/Adminview`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Incluir cookies
    body: JSON.stringify({ Password: Data.Password }),
  });

  return response;
}
