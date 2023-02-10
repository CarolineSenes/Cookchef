import { Outlet } from "react-router-dom";

function AdminRecipes() {
  return (
    <>
      <h1>Admin Recipes</h1>
      <Outlet />
    </>
  );
}

export default AdminRecipes;
