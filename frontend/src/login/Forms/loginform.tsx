import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authlogin, GetMe } from "../service/Auth.service.ts";

export function Formlogin() {
  const navigate = useNavigate();

  const [WrongPass, setWrongPass] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handlesubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const getToken = await Authlogin(formData.email, formData.password);

    const token = await getToken.json();
    if (!getToken.ok && token.message === "Unauthorized") {
      setWrongPass(true);
      return;
    }
    window.localStorage.setItem("token", token.token);

    const data = await GetMe(token.token);

    const infoUser = await data.json();
    console.log(infoUser)
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        email: infoUser.data[0].User_email,
        id: infoUser.data[0].Client_id,
        role: infoUser.data[0].Role,
        name: infoUser.data[0].User_names,
        LastName: infoUser.data[0].User_lastnames,
        Img: infoUser.data[0].Img_rute,
      }),
    );

    if (token.token && infoUser.data[0].Role === "Employee") {
      navigate("/tasksview");
    } else if (
      (token.token && infoUser.data[0].Role === "admin") ||
      (token.token && infoUser.data[0].Role === "supervisor")
    ) {
      navigate("/AdminView/Dashboard");
    }
  }

  function ShowPassword() {
    const pass = document.getElementById("password");
    if (!pass) return;
    const atributr = pass.getAttribute("type");

    if (atributr === "password") {
      pass.setAttribute("type", "text");
    }
    if (atributr === "text") {
      pass.setAttribute("type", "password");
    }
  }

  return (
    <form className="login-container CardStyle" onSubmit={handlesubmit}>
      <div className="login">
        <label>User</label>
        <div className="input-style">
          <MailOutlineOutlinedIcon className="icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handlechange}
            className="login-input"
            placeholder="email"
          />
        </div>
        <label>Password</label>
        <div className="input-style">
          <VpnKeyOutlinedIcon className="icon" />
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handlechange}
            className="login-input"
            placeholder="password"
          />
        </div>
        {WrongPass && <p className="wrongpass">Wrong Password</p>}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <input type="checkbox" id="pass" onChange={ShowPassword} />
        Show password
      </div>

      <button type="submit" className="primary-button">
        Login
      </button>
    </form>
  );
}
