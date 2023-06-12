import { useState, useRef, useMemo } from "react";
import { useRecoilState } from "recoil";
import { todosAtom, lastTodoIdAtom } from "./atoms";
import { dateToStr } from "./util";
import { produce } from "immer";

export function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [lastTodoId, setLastTodoId] = useRecoilState(lastTodoIdAtom);
  const lastTodoIdRef = useRef(lastTodoId);

  lastTodoIdRef.current = lastTodoId;

  const addTodo = (performDate, newContent) => {
    const id = ++lastTodoIdRef.current;
    setLastTodoId(id);

    const newTodo = {
      id,
      regDate: dateToStr(new Date()),
      performDate: dateToStr(new Date(performDate)),
      content: newContent,
      completed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);

    return id;
  };

  const modifyTodo = (index, performDate, newContent) => {
    const newTodos = produce(todos, (draft) => {
      draft[index].performDate = dateToStr(new Date(performDate));
      draft[index].content = newContent;
    });

    setTodos(newTodos);
  };

  const modifyTodoById = (id, performDate, newContent) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return;
    }

    modifyTodo(index, performDate, newContent);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  const removeTodoById = (id) => {
    const index = findTodoIndexById(id);

    if (index != -1) {
      removeTodo(index);
    }
  };

  const findTodoIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  };

  const findTodoById = (id) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return null;
    }

    return todos[index];
  };

  const toggleTodoCompleteById = (id) => {
    const index = findTodoIndexById(id);

    if (index == -1) return;

    setTodos(
      produce(todos, (draft) => {
        draft[index].completed = !draft[index].completed;
      })
    );
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    modifyTodoById,
    removeTodo,
    removeTodoById,
    findTodoIndexById,
    findTodoById,
    toggleTodoCompleteById,
  };
}

export function useTodoOptionDrawerState() {
  const [todoId, setTodoId] = useState(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const open = (id) => setTodoId(id);

  return {
    todoId,
    opened,
    close,
    open,
  };
}
