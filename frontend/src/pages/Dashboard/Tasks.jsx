import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, removeTask, updateTask } from "../../store/slices/taskSlice";
import Swal from "sweetalert2";

const Tasks = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.tasks);
  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await dispatch(addTask({ title })).unwrap();
      Swal.fire("Added", "Task added", "success");
      setTitle("");
    } catch (err) {
      Swal.fire("Error", "Could not add task", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Delete?",
      showCancelButton: true,
      icon: "warning"
    });
    if (confirmed.isConfirmed) {
      await dispatch(removeTask(id));
      Swal.fire("Deleted", "Task removed", "success");
    }
  };

  const handleToggleDone = async (t) => {
    const newStatus = t.status === "done" ? "pending" : "done";
    await dispatch(updateTask({ id: t._id, payload: { status: newStatus } }));
    Swal.fire("Updated", "Task status updated", "success");
  };

  return (
    <>
      <div className="mb-4 flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded flex-1" placeholder="New task title" />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>

      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {list.map((t) => (
            <li key={t._id} className="flex items-center justify-between border p-3 rounded">
              <div>
                <div className={`font-medium ${t.status === "done" ? "line-through text-gray-400" : ""}`}>{t.title}</div>
                <div className="text-sm text-gray-500">{t.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleToggleDone(t)} className="px-3 py-1 border rounded">{t.status === "done" ? "Undo" : "Done"}</button>
                <button onClick={() => handleDelete(t._id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Tasks;
