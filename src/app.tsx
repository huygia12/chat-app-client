import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ChatPage,
  HomePage,
  Login,
  PageNotFound,
  Signup,
  Unauthorized,
} from "./pages";
import { AdminLayout, UserLayout } from "./layout";
import Playground from "./pages/play-ground";
import { AuthProvider, DarkModeProvider } from "./context";

function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/** Normal user */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/messages" element={<ChatPage />} />
              <Route path="test" element={<Playground />} />
            </Route>
            {/** Admin */}
            <Route path="/admin" element={<AdminLayout />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </DarkModeProvider>
    </BrowserRouter>
  );
}

export default App;
