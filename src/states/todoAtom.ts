// todoAtom.ts
import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 使用 atomWithImmer 创建基础 atom
const todosAtom = atomWithImmer<Todo[]>([
  { id: 1, text: '学习 Jotai', completed: false },
  { id: 2, text: '学习 Immer', completed: false },
]);

// 创建派生的 atoms 来处理不同的操作
const addTodoAtom = atom(null, (get, set, text: string) => {
  set(todosAtom, draft => {
    draft.push({
      id: Date.now(),
      text,
      completed: false,
    });
  });
});

const toggleTodoAtom = atom(null, (get, set, id: number) => {
  set(todosAtom, draft => {
    const todo = draft.find(item => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  });
});

const deleteTodoAtom = atom(null, (get, set, id: number) => {
  set(todosAtom, draft => {
    const index = draft.findIndex(item => item.id === id);
    if (index > -1) {
      draft.splice(index, 1);
    }
  });
});

export { todosAtom, addTodoAtom, toggleTodoAtom, deleteTodoAtom };
