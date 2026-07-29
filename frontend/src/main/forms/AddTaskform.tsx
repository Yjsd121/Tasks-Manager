import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { type SelectChangeEvent } from "@mui/material/Select";

import "./AddTaskform.css";
import { type Task } from "../../type";

interface Props {
  task: Task | null;
  onCancel: () => void;
  onSave: (task: Task) => void;
}

const initialTask: Task = {
  title: "",
  description: "",
  priority: "",
  assignedTo: "",
  createdAt: "",
  dueDate: "",
  status: "pending",
};

function formatDateInput(date?: string) {
  if (!date) return "";
  return String(date).split("T")[0];
}
interface User {
  Client_id: string;
  User_names: string;
}
export const AddTask: React.FC<Props> = ({ task, onCancel, onSave }) => {
  //STATES
  const [formData, setFormData] = React.useState({
    ...initialTask,
    ...task,
    dueDate: formatDateInput(task?.dueDate),
  });

  const [error, setError] = React.useState("");
  const isEditing = Boolean(task?.id);
  const [userIDs, setUsersid] = React.useState<User[]>([]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onSave(formData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  React.useEffect(() => {
    const getUsers = async () => {
      const token = window.localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/Adminview/userid", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data.data);
      setUsersid(data.data);
    };

    getUsers();
  }, []);

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>

        <textarea
          className="form-textarea"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="select-container">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth required>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              label="Priority"
              onChange={handleSelectChange}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth required>
            <InputLabel>Assigned to</InputLabel>

            <Select
              name="assignedTo"
              value={formData.assignedTo}
              label="Assigned to"
              onChange={handleSelectChange}
            >
              {userIDs.map((user) => (
                <MenuItem key={user.Client_id} value={user.Client_id}>
                  {user.User_names}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <input
          className="form-input input-date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          required
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="secondary-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          {isEditing ? "Update" : "Create Task"}
        </button>
      </div>
    </form>
  );
};
