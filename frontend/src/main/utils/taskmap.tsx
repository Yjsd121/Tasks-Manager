import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getcolor } from "@/static/getcolor";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import type { ListTasks, Task } from "@/type";

interface Props {
  tasks: ListTasks;
  onDelete: (id: string | undefined) => void;
  onEdit: (task: Task) => void;
  filter: string;
  handlechange: (id: string, status: Task["status"]) => void;
}

export const Tasksmap: React.FC<Props> = ({
  tasks,
  onDelete,
  onEdit,
  filter,
  handlechange,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES");
  };

  return (
    <section className="Tasks-container">
      <div className="Block CardStyle">
        {tasks
          .filter((item) => {
            return (
              (item != null && item.status === filter) ||
              (item != null && filter === "all")
            );
          })
          .map((item) => {
            const bg = getcolor(item.priority);

            return (
              <section
                className={
                  item.status === "in process"
                    ? "task-card inprocess"
                    : item.status === "completed"
                      ? "task-card completed"
                      : "task-card"
                }
                key={item.id}
                style={{
                  boxShadow: `2px 5px 0px 3px ${bg.shadow}`,
                }}
              >
                <div
                  className="status"
                  style={{
                    background: bg.bgTitle,
                  }}
                >
                  <h2>{item.status}</h2>
                </div>

                <div
                  className="tasks"
                  style={{
                    background: bg.bgcard,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".3rem",
                      }}
                    >
                      <h3>Title: </h3>
                      <p>{item.title}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".3rem",
                      }}
                    >
                      <h3> Priority: </h3>
                      <p>{item.priority}</p>
                    </div>
                  </div>

                  <p>Description: </p>
                  <p>{item.description}</p>
                  <p className="date">
                    created at: {formatDate(item.createdAt)}
                  </p>
                  <p className="date">Due date: {formatDate(item.dueDate)}</p>
                </div>

                <div
                  className="btns"
                  style={{
                    background: bg.bgcard,
                  }}
                >
                  <div className="check">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>

                        <Select
                          name="status"
                          value={item.status}
                          label="Status"
                          onChange={(e) => {
                            handlechange(
                              item.taskId!,
                              e.target.value as Task["status"],
                            );
                          }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="in process">in-Process</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <button className="btn-card" onClick={() => onEdit(item)}>
                      <EditOutlinedIcon />
                    </button>
                    <button
                      className="btn-card"
                      onClick={() => onDelete(item.id)}
                    >
                      <DeleteForeverOutlinedIcon />
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
      </div>
    </section>
  );
};
