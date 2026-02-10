import { AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, deleteTodo, toggleTodo, updateTodo }) {
  return (
    <AnimatePresence>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
        />
      ))}
    </AnimatePresence>
  );
}