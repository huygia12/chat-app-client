import { RouterProvider } from "react-router-dom";
import routes from "./pages/routes";
import { DarkModeProvider } from "./context/dark-mode-context";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
