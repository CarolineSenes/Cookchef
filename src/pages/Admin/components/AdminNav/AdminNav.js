import { NavLink } from "react-router-dom";
import styles from './AdminNav.module.scss';

function AdminNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column`}>
      <NavLink to='recipes' className={({ isActive }) => (isActive ? styles.active : '')}>Recettes</NavLink>
      <NavLink to='users' className={({ isActive }) => (isActive ? styles.active : '')}>Utilisateurs</NavLink>
    </ul>
  )
}

export default AdminNav;
