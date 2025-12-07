import { useState } from "react";
import API from "../api";

export default function ReminderForm({ reload }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dateTime, setDateTime] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/reminders", { title, notes, dateTime });
    setTitle("");
    setNotes("");
    setDateTime("");
    reload();
  };

  return (
    <form onSubmit={submit} className="mb-6">
      <h2 className="font-bold mb-2 text-xl">Add Reminder</h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-3"
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <button className="bg-blue-700 text-white p-2 w-full">Create</button>
    </form>
  );
}
