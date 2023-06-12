import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export default function TodosEmpty() {
  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <div className="grid gap-2">
          <span>
            <span className="text-[color:var(--mui-color-primary-main)]">
              할 일
            </span>
            을 입력해주세요.
          </span>

          <Button variant="contained" to="/write" component={NavLink}>
            할 일 추가하기
          </Button>
        </div>
      </div>
    </>
  );
}
