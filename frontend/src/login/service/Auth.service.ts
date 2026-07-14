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
