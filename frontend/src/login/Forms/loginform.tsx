import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authlogin } from "../service/Auth.service.ts";

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

    const response = await Authlogin(formData.email, formData.password);

    const data = await response.json();
    if (!response.ok && data.message === "Unauthorized") {
      setWrongPass(true);
      return;
    }
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        email: data.email,
        id: data.id,
        role: data.role,
        name: data.name,
        LastName: data.LastName,
        Img: data.img,
      }),
    );

    if (
      (data.token && data.role === "Employee") ||
      (data.token && data.role === "supervisor")
    ) {
      navigate("/tasksview");
    } else if (data.token && data.role === "admin") {
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
