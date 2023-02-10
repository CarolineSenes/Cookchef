/**
 * Menu burger pour mobile
 */

import { NavLink } from "react-router-dom";
import styles from "./HeaderMenu.module.scss";

function HeaderMenu(setPage) {
  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <li>
        <NavLink to="/admin">Admin</NavLink>
      </li>
      <li>Wishlist</li>
      <li>Connexion</li>
    </ul>
  );
}

export default HeaderMenu;
