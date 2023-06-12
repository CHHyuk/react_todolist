import { useNoticeSnackbarState } from "./NoticeSnackbar";
import { useTodosState } from "../hooks";
import {
  SwipeableDrawer,
  List,
  ListItem,
  Divider,
  ListItemButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function TodoOptionDrawer({ state }) {
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const removeTodo = () => {
    if (
      window.confirm(`${state.todoId}번 할 일을 삭제하시겠습니까?`) == false
    ) {
      return;
    }

    todosState.removeTodoById(state.todoId);
    state.close();
    noticeSnackbarState.open(
      `${state.todoId}번 할 일이 삭제되었습니다.`,
      "info"
    );
  };

  const todo = todosState.findTodoById(state.todoId);

  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={state.opened}
        onClose={state.close}
      >
        <List className="!py-0">
          <ListItem className="!pt-6 !p-5">
            <span className="text-[color:var(--mui-color-primary-main)]">
              {todo?.id}번
            </span>
            <span>&nbsp;</span>
            <span>할 일에 대해</span>
          </ListItem>
          <Divider />
          <ListItemButton
            className="!pt-6 !p-5 !items-baseline"
            component={NavLink}
            to={`/edit/${todo?.id}`}
          >
            <i className="fa-regular fa-pen-to-square"></i>
            &nbsp;수정
          </ListItemButton>
          <ListItemButton
            className="!pt-6 !p-5 !items-baseline"
            onClick={removeTodo}
          >
            <i className="fa-regular fa-trash-can"></i>
            &nbsp;삭제
          </ListItemButton>
        </List>
      </SwipeableDrawer>
    </>
  );
}
