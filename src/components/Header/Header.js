/**
 * Menu pour desktop
 */

import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import cookchef from "../../assets/images/cookchef.png";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";

function Header({ setPage }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <NavLink to="/">
          <img src={cookchef} alt="logo cookchef" />
        </NavLink>
      </div>
      <ul className={styles.headerList}>
        <NavLink to="/admin">
          <button className="mr-5 btn btn-reverse-primary">
            Admin
          </button>
        </NavLink>
        <button className="mr-5 btn btn-reverse-primary">
          <i className="fa-solid fa-heart mr-5"></i>
          <span>Wishlist</span>
        </button>
        <button className="btn btn-primary">connexion</button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMenu setPage={setPage} />
        </>
      )}
    </header>
  );
}

export default Header;
