import { useState } from "react";
import { changefirstPass } from "../service/Auth.service";

export const ChangePass = () => {
  const [showpass, setshowpass] = useState(false);
  const [formData, setformData] = useState({
    Password: "",
    confirmPass: "",
  });
  const SamePass = formData.Password === formData.confirmPass;
  function ShowPassword() {
    setshowpass(!showpass);
  }

  function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handlesubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const userString = window.localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (user === null) return;
    if (!token) return;

    changefirstPass(user.id, formData, token);
  }

  return (
    <form className="login-container" onSubmit={handlesubmit}>
      <section>
        <h2>Change Password</h2>
        <p>change your password to continue</p>
      </section>

      <section className="login">
        <label>Password</label>
        <div className="input-style">
          <input
            type={showpass ? "text" : "password"}
            className="login-input"
            placeholder="Password"
            name="Password"
            onChange={handlechange}
            value={formData.Password}
          />
        </div>

        <label>Confirm password</label>
        <div className="input-style">
          <input
            type={showpass ? "text" : "password"}
            className="login-input"
            placeholder="Confirm Password"
            name="confirmPass"
            onChange={handlechange}
            value={formData.confirmPass}
          />
        </div>
      </section>

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

      {SamePass ? (
        <div className="Same">Same</div>
      ) : (
        <div className="NotSame">Not Same</div>
      )}

      <button type="submit" disabled={!SamePass} className="primary-button">
        Confirm
      </button>
    </form>
  );
};
