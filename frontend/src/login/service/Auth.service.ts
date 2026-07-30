export async function Authlogin(Email: string, pass: string) {
  const response = await fetch("http://localhost:3000/Auth/login", {
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
  const response = await fetch("http://localhost:3000/Adminview/Me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return response;
}
