import { AppBar, Toolbar } from "@mui/material";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import EditPage from "./pages/EditPage";
import { NoticeSnackbar } from "./components/NoticeSnackbar";

function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <NavLink
            to="/main"
            className="font-bold select-none flex self-stretch items-center mr-auto"
          >
            MY TODOLIST
          </NavLink>
          {location.pathname == "/main" && (
            <NavLink
              to="/write"
              className="select-none flex self-stretch items-center"
            >
              할 일 추가
            </NavLink>
          )}
          {location.pathname != "/main" && (
            <NavLink
              to="/main"
              className="select-none flex self-stretch items-center"
            >
              리스트
            </NavLink>
          )}
        </Toolbar>
      </AppBar>

      <NoticeSnackbar />

      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;
