import API from "../api";

export default function ReminderList({ reminders, reload }) {
  const del = async (id) => {
    await API.delete("/reminders/" + id);
    reload();
  };

  return (
    <div>
      <h2 className="font-bold mb-2 text-xl">Your Reminders</h2>
      {reminders.length === 0 && <p className="text-gray-600">No reminders yet</p>}
      <ul>
        {reminders.map((r) => (
          <li key={r._id} className="border p-3 mb-2 rounded">
            <div className="font-bold">{r.title}</div>
            <div className="text-sm text-gray-700">{r.notes}</div>
            <div className="text-sm text-gray-500">
              {new Date(r.dateTime).toLocaleString()}
            </div>
            <button
              className="mt-2 bg-red-500 text-white px-3 py-1"
              onClick={() => del(r._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
