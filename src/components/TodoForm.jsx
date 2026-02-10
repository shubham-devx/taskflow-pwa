import { useState } from "react";
import { motion } from "framer-motion";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("Student");
  const [dueDate, setDueDate] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text || !dueDate) return;

    addTodo({
      id: Date.now(),
      text,
      type,
      dueDate,
      completed: false,
    });

    setText("");
    setDueDate("");
  };

  return (
    <motion.form
      onSubmit={submit}
      className="form"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select onChange={(e) => setType(e.target.value)}>
        <option>Student</option>
        <option>Work</option>
        <option>Personal</option>
      </select>

      <button>Add</button>
    </motion.form>
  );
}