import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { getRecipe } from "./apis";
import App from "./App";
import Admin from "./pages/Admin/Admin";
import Homepage from "./pages/Homepage/Homepage";

const AdminRecipes = lazy(() =>
  import("./pages/Admin/pages/AdminRecipes/AdminRecipes")
);
const AdminUsers = lazy(() =>
  import("./pages/Admin/pages/AdminUsers/AdminUsers")
);
const AdminRecipesList = lazy(() =>
  import(
    "./pages/Admin/pages/AdminRecipes/pages/AdminRecipesList/AdminRecipesList"
  )
);
const AdminRecipesForm = lazy(() =>
  import(
    "./pages/Admin/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipesForm"
  )
);

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
        children: [
          {
            path: "recipes",
            element: <AdminRecipes />,
            children: [
              {
                path: "list",
                element: <AdminRecipesList />,
              },
              {
                path: "new",
                element: <AdminRecipesForm />,
              },
              {
                path: "edit/:recipeId",
                element: <AdminRecipesForm />,
                loader: async ({ params: { recipeId } }) => getRecipe(recipeId), // va charger la recette quand cette route est appellée
              },
              {
                // si l'utilisateur arrive sur '/recipes' il sera rediriger vers "/admin/recipes/list"
                index: true,
                loader: async () => redirect("/admin/recipes/list"),
              },
            ],
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            // si l'utilisateur arrive sur '/users' il sera rediriger vers "/admin/recipes"
            index: true,
            loader: async () => redirect("/admin/recipes"),
          },
        ],
      },
    ],
  },
]);
