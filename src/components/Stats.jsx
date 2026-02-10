export default function Stats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="stats">
      <div>📌 Total: {total}</div>
      <div>✅ Completed: {completed}</div>
      <div>⏳ Pending: {pending}</div>
    </div>
  );
}