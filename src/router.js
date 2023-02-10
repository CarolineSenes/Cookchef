import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Admin from "./pages/Admin/Admin";
import Homepage from "./pages/Homepage/Homepage";

// Router initialisation
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);
