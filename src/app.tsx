import { RouterProvider } from "react-router-dom";
import routes from "./pages/routes";
import { DarkModeProvider } from "./context/dark-mode-context";
import { UserDecodedProvider } from "./context/user-context";

function App() {
  return (
    <DarkModeProvider>
      <UserDecodedProvider>
        <RouterProvider router={routes} />
      </UserDecodedProvider>
    </DarkModeProvider>
  );
}

export default App;
