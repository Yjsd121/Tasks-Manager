import { API_URL } from "@/service/Api";

export async function Authlogin(Email: string, pass: string) {
  const response = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: Email,
      password: pass,
    }),
  });

  return await response;
}

export async function GetMe(token: string) {
  const response = await fetch(`${API_URL}/Adminview/Me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}

interface changePass {
  Password: string;
  confirmPass: string;
}

export async function changefirstPass(Data: changePass, token: string) {
  console.log(Data);
  const response = await fetch(`${API_URL}/Adminview`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ Password: Data.Password }),
  });

  return response;
}
