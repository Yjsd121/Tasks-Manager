import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { User } from "../../type";
import { API_URL } from "@/service/Api";

const InitialUser = {
  Client_id: "",
  User_names: "",
  User_lastnames: "",
  User_email: "",
  Password: "",
  Role: "",
  Img_rute: "",
};

interface Props {
  user: User | null;
  onCancel: () => void;
  onSave: (data: FormData) => void;
}

type UserFormData = typeof InitialUser;

export const AddUserForm: React.FC<Props> = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState<UserFormData>({
    ...InitialUser,
    ...user,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const isEditinng = Boolean(user?.Client_id);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();

    if (isEditinng) {
      formdata.append("Client_id", formData.Client_id);
    }

    formdata.append("User_names", formData.User_names);
    formdata.append("User_lastnames", formData.User_lastnames);
    formdata.append("User_email", formData.User_email);
    formdata.append("Role", formData.Role);
    if (formData.Password) {
      formdata.append("Password", formData.Password);
    }
    if (image) {
      formdata.append("Img_rute", image);
    }

    await onSave(formdata);
  };

  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <p className="form-label">Name</p>
        <input
          className="form-input"
          name="User_names"
          placeholder="Name"
          value={formData.User_names}
          onChange={handleChange}
          required
        />
        <p className="form-label">LastName</p>
        <input
          className="form-input"
          name="User_lastnames"
          placeholder="LastName"
          value={formData.User_lastnames}
          onChange={handleChange}
          required
        />
        <p className="form-label">Email</p>
        <input
          className="form-input"
          name="User_email"
          placeholder="Email"
          value={formData.User_email}
          onChange={handleChange}
          required
        />
        <p className="form-label">Password</p>
        <input
          className="form-input"
          name="Password"
          placeholder={isEditinng ? "New password (optional)" : "Password"}
          value={formData.Password}
          onChange={handleChange}
          required={!isEditinng}
        />
      </div>
      <div className="select-container">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="Role"
              value={formData.Role}
              label="Role"
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="supervisor">supervisor</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <label className="upload-image">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            name="Img"
          />
          <span>Seleccionar imagen</span>
        </label>
        <img
          className="profile-preview"
          src={
            preview ||
            (isEditinng
              ? `${API_URL}/uploads/${formData.Img_rute}`
              : "/UserDefault.png")
          }
          alt="img profile"
        />
      </div>
      <div className="form-actions">
        <button className="secondary-btn" type="button" onClick={onCancel}>
          Close
        </button>
        <button className="primary-btn" type="submit">
          {isEditinng ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};
