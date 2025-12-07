import { useEffect, useState } from "react";
import API from "../api";
import ReminderForm from "../Components/ReminderForm";
import ReminderList from "../Components/ReminderList";

export default function Dashboard() {
  const [reminders, setReminders] = useState([]);

  const loadReminders = async () => {
    const { data } = await API.get("/reminders");
    setReminders(data);
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="bg-red-600 text-white px-3 py-1" onClick={logout}>
          Logout
        </button>
      </div>

      <ReminderForm reload={loadReminders} />
      <ReminderList reminders={reminders} reload={loadReminders} />
    </div>
  );
}
