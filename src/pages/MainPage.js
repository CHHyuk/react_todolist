import TodosEmpty from "../components/TodosEmpty";
import { useTodosState } from "../hooks";
import TodoList from "./TodoListPage";

export default function MainPage() {
  const todosState = useTodosState();

  const todosEmpty = todosState.todos.length == 0;

  if (todosEmpty) {
    return <TodosEmpty />;
  }

  return (
    <>
      <TodoList />
    </>
  );
}
