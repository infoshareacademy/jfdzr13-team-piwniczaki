import { NavLink } from "react-router-dom";
import logo from "../../assets/paw.png";
import styles from "./navBar.module.scss";

function NavBar() {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navLeft}>
        <div>ZWIERZAPP</div>
        <img className={styles.navLogo} src={logo} alt="logo łapy"></img>
      </div>
      <NavLink to="/login">
        <button className={styles.navLoginButton}>ZALOGUJ SIĘ</button>
      </NavLink>
    </nav>
  );
}

export default NavBar;
