import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authlogin, GetMe } from "../service/Auth.service.ts";
import { Modal } from "@/components/modal/modal.tsx";
import { ChangePass } from "./ChangePassword.tsx";

export function Formlogin() {
  const navigate = useNavigate();

  const [showpass, setshowpass] = useState(false);
  // Estado para manejar mensajes de error genéricos del servidor
  const [errorMessage, setErrorMessage] = useState("");
  // Estado de carga para mejorar la UX y prevenir múltiples clicks
  const [isLoading, setIsLoading] = useState(false);
  const [firstlogin, setfirst] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiamos el error al escribir de nuevo
    if (errorMessage) setErrorMessage("");
  }

  async function handlesubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validación local simple
    if (!formData.email || !formData.password) {
      setErrorMessage("Por favor llena todos los campos");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const getToken = await Authlogin(formData.email, formData.password);
      const token = await getToken.json();

      if (!getToken.ok) {
        // Mostramos el mensaje devuelto por el backend (puede ser de Zod o credenciales inválidas)
        setErrorMessage(token.message || "Error al iniciar sesión");
        setIsLoading(false);
        return;
      }
      
      const data = await GetMe();
      const infoUser = await data.json();
      
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

      if (infoUser.data[0].first_login) {
        setfirst(true);
      } else {
        goto(infoUser.data[0].Role);
      }
    } catch (error) {
      setErrorMessage("Error de conexión con el servidor");
    } finally {
      setIsLoading(false);
    }
  }

  function goto(Role: String) {
    if (Role === "Employee") {
      navigate("/tasksview");
    } else if (
      (Role === "admin") ||
      (Role === "supervisor")
    ) {
      navigate("/AdminView/Dashboard");
    }
  }

  function ShowPassword() {
    setshowpass(!showpass);
  }

  return (
    <div>
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
              type={showpass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handlechange}
              className="login-input"
              placeholder="password"
            />
          </div>
          {errorMessage && <p className="wrongpass" style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{errorMessage}</p>}
        </div>
        <div
          className="show-pass-container"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <input type="checkbox" id="pass" onChange={ShowPassword} />
          <label htmlFor="pass" style={{ margin: 0, cursor: 'pointer' }}>Show password</label>
        </div>

        <button type="submit" className="primary-button" disabled={isLoading}>
          {isLoading ? "Iniciando..." : "Login"}
        </button>
      </form>
      {firstlogin && (
        <Modal>
          <ChangePass />
        </Modal>
      )}
    </div>
  );
}
