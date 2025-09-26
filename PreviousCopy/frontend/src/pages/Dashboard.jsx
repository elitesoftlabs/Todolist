import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/TaskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "Pending" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateTask(editId, form);
      setEditId(null);
    } else {
      await addTask(form);
    }
    setForm({ title: "", description: "", status: "Pending" });
    loadTasks();
  };

  const handleEdit = (task) => {
    setForm(task);
    setEditId(task.id);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <h3>My Tasks</h3>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row g-2">
          <div className="col-md-3">
            <input className="form-control" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-md-2">
            <select className="form-control" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100">{editId ? "Update" : "Add Task"}</button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-responsive">
        <thead>
          <tr><th>Title</th><th>Description</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.status}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(t)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Dashboard;