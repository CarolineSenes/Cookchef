import { NavLink } from "react-router-dom";
import styles from "./AdminRecipesNav.module.scss";

function AdminRecipesNav() {
  return (
    <ul className={styles.list}>
      <NavLink
        to="list"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Liste des recettes
      </NavLink>
      <NavLink
        to="new"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Ajouter une recette
      </NavLink>
    </ul>
  );
}

export default AdminRecipesNav;
