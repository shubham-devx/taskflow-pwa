// import { motion } from "framer-motion";
// import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
// import { useState } from "react";

// export default function TodoItem({ todo, deleteTodo, toggleTodo, updateTodo }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newText, setNewText] = useState(todo.text);

//   const isLate =
//     !todo.completed && new Date(todo.dueDate) < new Date();

//   const saveEdit = () => {
//     updateTodo(todo.id, newText);
//     setIsEditing(false);
//   };

//   return (
//     <motion.div
//       layout
//       className={`todo ${todo.completed ? "done" : ""} ${isLate ? "late" : ""}`}
//       initial={{ opacity: 0, x: -30 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 30 }}
//     >
//       <div onClick={() => !isEditing && toggleTodo(todo.id)}>
//         {isEditing ? (
//           <input
//             value={newText}
//             onChange={(e) => setNewText(e.target.value)}
//           />
//         ) : (
//           <>
//             <strong>{todo.text}</strong>
//             <div className="meta">
//               {todo.type} | 📅 {todo.dueDate}
//             </div>
//           </>
//         )}
//       </div>

//       <div className="icons">
//         {isEditing ? (
//           <FaSave onClick={saveEdit} />
//         ) : (
//           <FaEdit onClick={() => setIsEditing(true)} />
//         )}
//         <FaTrash onClick={() => deleteTodo(todo.id)} />
//       </div>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";

export default function TodoItem({ todo, deleteTodo, toggleTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const isLate =
    !todo.completed && new Date(todo.dueDate) < new Date();

  const saveEdit = () => {
    if (!newText.trim()) return;
    updateTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      className={`todo ${todo.completed ? "done" : ""} ${isLate ? "late" : ""}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {/* LEFT SIDE */}
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {isEditing ? (
          <input
            className="edit-input"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        ) : (
          <div>
            <strong>{todo.text}</strong>
            <div className="meta">
              {todo.type} | 📅 {todo.dueDate}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE ICONS */}
      <div className="icons">
        {isEditing ? (
          <FaSave onClick={saveEdit} />
        ) : (
          <FaEdit onClick={() => setIsEditing(true)} />
        )}
        <FaTrash onClick={() => deleteTodo(todo.id)} />
      </div>
    </motion.div>
  );
}