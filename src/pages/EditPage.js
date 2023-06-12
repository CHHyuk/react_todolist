import { TextField, Button } from "@mui/material";

import { useTodosState } from "../hooks";
import { useNoticeSnackbarState } from "../components/NoticeSnackbar";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const todo = todosState.findTodoById(id);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.performDate.value.length == 0) {
      alert("날짜를 입력해주세요.");
      form.performDate.focus();
      return;
    }

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요.");
      form.content.focus();
      return;
    }

    const newTodoId = todosState.modifyTodoById(
      todo.id,
      form.performDate.value,
      form.content.value
    );

    noticeSnackbarState.open(`${todo.id}번 할 일이 수정되었습니다.`, "info");
    navigate(-1);
  };

  const performDateForInput = todo.performDate.substr(0, 16).replace(" ", "T");

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex-1 flex flex-col gap-7 p-10 sm:p-8"
      >
        <TextField
          label="언제 해야 하나요?"
          focused
          type="datetime-local"
          name="performDate"
          defaultValue={performDateForInput}
        />

        <TextField
          name="content"
          label="무엇을 해야 하나요?"
          className="flex-1 flex"
          InputProps={{ className: "flex-1 flex-col" }}
          inputProps={{ className: "flex-1" }}
          multiline
          defaultValue={todo.content}
        />

        <Button type="submit" variant="contained">
          <span>
            <i className="fa-solid fa-pencil"></i>
          </span>
          <span>&nbsp;</span>
          <span>{todo.id}번 할 일 수정</span>
        </Button>
      </form>
    </>
  );
}
