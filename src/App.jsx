import { useState, useEffect, useRef } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [canInstall, setCanInstall] = useState(false);

  // 🔑 IMPORTANT: useRef instead of state
  const installPrompt = useRef(null);

  /* ---------------- STORAGE ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* ---------------- PWA INSTALL FIX ---------------- */
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      installPrompt.current = e;   // store safely
      setCanInstall(true);         // show button
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt.current) return;

    installPrompt.current.prompt();
    await installPrompt.current.userChoice;

    installPrompt.current = null;
    setCanInstall(false);
  };

  /* ---------------- CRUD ---------------- */
  const addTodo = (todo) => setTodos([...todos, todo]);

  const deleteTodo = (id) =>
    setTodos(todos.filter((t) => t.id !== id));

  const toggleTodo = (id) =>
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  const updateTodo = (id, newText) =>
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );

  const filteredTodos =
    filter === "All"
      ? todos
      : todos.filter((t) => t.type === filter);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>📌 TaskFlow</h2>
        <nav>
          <button className="active">Dashboard</button>
          <button>Tasks</button>
          <button>Calendar</button>
          <button>Settings</button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* HEADER */}
        <header className="header">
          <h1>Dashboard</h1>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {canInstall && (
              <button className="install-btn" onClick={handleInstall}>
                ⬇ Install App
              </button>
            )}
            <span className="user">👤 User</span>
          </div>
        </header>

        {/* STATS */}
        <div className="stats-grid">
          <div className="card">
            <h3>Total Tasks</h3>
            <p>{todos.length}</p>
          </div>
          <div className="card">
            <h3>Completed</h3>
            <p>{todos.filter((t) => t.completed).length}</p>
          </div>
          <div className="card">
            <h3>Pending</h3>
            <p>{todos.filter((t) => !t.completed).length}</p>
          </div>
        </div>

        {/* FILTER */}
        <div className="filter">
          {["All", "Student", "Work", "Personal"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* TASKS */}
        <section className="tasks">
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={filteredTodos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
          />
        </section>
      </main>
    </div>
  );
}