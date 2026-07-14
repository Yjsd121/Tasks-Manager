import { NavLink } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import "./barnav.css";

export function Barnav() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <>
      <section className="barnav">
        <div className="logo">
          <NavLink className="link" to="/tasksview">
            <img className="icon" src="TasksIcon.png" />
            <p>Tasks Manager</p>
          </NavLink>
        </div>
        <div className="links">
          <NavLink className="link" to="/tasksview">
            <AssignmentOutlinedIcon />
            <p>Tasks</p>
          </NavLink>
          <NavLink className="link" to="/tasksview">
            <img
              style={{
                width: "35px",
              }}
              src={`http://localhost:3000/uploads/${user.Img}`}
              alt="xd"
            />
            <p>{user.name}</p>
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              window.localStorage.clear();
            }}
            className="link"
          >
            <LogoutOutlinedIcon />
            <p>Logout</p>
          </NavLink>
        </div>
      </section>
    </>
  );
}
