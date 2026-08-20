import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Searchfilters } from "./search-filters/filtersBar";
import { Modal } from "../../../components/modal/modal";

import { AddTask } from "@/main/forms/AddTaskform";
import { Tasksmap } from "@/main/utils/taskmap";
import { useNavigate } from "react-router-dom";

import { type ListTasks, type Task } from "../../../type";

export function Tasksx() {
  const [filter, setFilter] = useState("all");

  const [showmodal, setshow] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [Tasksdata, setdata] = useState<ListTasks>([]);
  const [loading, setLoading] = useState(true);

  const hastask = Tasksdata?.length > 0;
  const token = window.localStorage.getItem("token");


  const navigate = useNavigate();

  async function gettasks() {
    try {
      const response = await fetch("http://localhost:3000/tasksview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.statusText === "Unauthorized") {
          navigate("/");
          window.localStorage.clear();
        }
        throw new Error("Error fetching tasks");
      }

      const data = await response.json();

      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTask(taskData: Task) {
    const isEditing = Boolean(taskData.taskId);
    const response = await fetch(
      `http://localhost:3000/tasksview${isEditing ? `/${taskData.taskId}` : ""}`,
      {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      const message = Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message;
      throw new Error(message || "Error saving task");
    }

    setdata((prevTasks) => {
      if (isEditing) {
        return prevTasks.map((task: Task) =>
          task.taskId === data.data.taskId ? data.data : task,
        );
      }

      return [...prevTasks, data.data];
    });

    closeModal();
  }

  async function deleteTask(id: string | undefined) {
    const response = await fetch(`http://localhost:3000/tasksview/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting task");
    }

    setdata((prevTasks) => prevTasks.filter((task: Task) => task.id !== id));
  }

  function openEditModal(task: Task) {
    setSelectedTask(task);
    setshow(true);
  }

  function closeModal() {
    setSelectedTask(null);
    setshow(false);
  }

  useEffect(() => {
    async function loadTasks() {
      const data = await gettasks();
      setdata(data || []);
      setLoading(false);
    }

    loadTasks();
  }, []);

  const HandlechangeStatus = (id: string, status: Task["status"]) => {
    const TasktoUpdate = Tasksdata.find((item) => item.taskId === id);

    if (!TasktoUpdate) return;

    const toUpdate = {
      ...TasktoUpdate,
      status: status,
    };

    saveTask(toUpdate);
  };

  return (
    <div style={{width:'100%'}}>
      <Searchfilters
        showmodal={showmodal}
        setshow={(value: boolean) => {
          setSelectedTask(null);
          setshow(value);
        }}
        filter={filter}
        setfilter={setFilter}
      />
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </div>
      )}
      {!loading && hastask && (
        <Tasksmap
          tasks={Tasksdata}
          onDelete={deleteTask}
          onEdit={openEditModal}
          filter={filter}
          handlechange={HandlechangeStatus}
        />
      )}
      {!loading && !hastask && (
        <p style={{ textAlign: "center" }}>Sin tareas</p>
      )}
      {showmodal && (
        <Modal>
          <AddTask
            task={selectedTask}
            onCancel={closeModal}
            onSave={saveTask}
          />
        </Modal>
      )}
    </div>
  );
}
