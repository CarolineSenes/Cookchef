import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AdminRecipesNav from "./components/AdminRecipeNav/AdminRecipeNav";

function AdminRecipes() {
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des recettes</h4>
      <div className="flex-fill d-flex flex-column">
          <AdminRecipesNav />
          <div className="flex-fill d-flex flex-column">
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
      </div>
    </div>
  );
}

export default AdminRecipes;
