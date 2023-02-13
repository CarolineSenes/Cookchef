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

// router initialization
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
                // if the user arrives at '/recipes' he will be redirected to "/admin/recipes/list"
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
            // if the user arrives at '/users' he will be redirected to "/admin/recipes"
            index: true,
            loader: async () => redirect("/admin/recipes"),
          },
        ],
      },
    ],
  },
]);
