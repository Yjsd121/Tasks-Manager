import "./Viewtask.css";
import { Barnav } from "../main/components/barnav/barnav";
import { Minichart } from "./components/minichart/minichart";
import { Tasksx } from "./components/Tasks/Tasksx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { type ListStast } from "../type";
import { API_URL } from "@/service/Api";

export function Viewtask() {
  const navigate = useNavigate();
  const [Data, setdata] = useState<ListStast>([]);

  async function MiniData() {
    try {
      const token = window.localStorage.getItem("token");
      const userString = window.localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      const response = await fetch(`${API_URL}/Minichart/${user.name}`, {
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
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function load() {
      const data = await MiniData();
      setdata(data || []);
    }
    load();
  }, []);

  return (
    <main>
      <Barnav />
      <Minichart stats={Data} />

      <div className="correct">
        <Tasksx />
      </div>
    </main>
  );
}
