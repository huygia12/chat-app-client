import { RouterProvider } from "react-router-dom";
import routes from "./pages/routes";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <RouterProvider router={routes} />
    </DarkModeProvider>
  );
}

export default App;
