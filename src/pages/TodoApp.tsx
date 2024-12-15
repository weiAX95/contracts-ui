import { useState } from 'react';
import { useAtom } from 'jotai';
import { todosAtom, addTodoAtom, toggleTodoAtom, deleteTodoAtom } from '@/states/todoAtom';

const TodoApp = () => {
  const [todos] = useAtom(todosAtom);
  const [, addTodo] = useAtom(addTodoAtom);
  const [, toggleTodo] = useAtom(toggleTodoAtom);
  const [, deleteTodo] = useAtom(deleteTodoAtom);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            placeholder="添加新任务..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            添加
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="h-4 w-4"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 text-red-500 hover:text-red-700"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
