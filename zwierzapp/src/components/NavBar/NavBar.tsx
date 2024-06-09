import styles from "./navBar.module.scss";
import paw from "../../images/Paw.svg"
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthContext"
import { Link as ScrollTrigger } from 'react-scroll';

function NavBar() {
  const { currentUser, logout } = useAuth() || {};
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoAndNameNav}>
      <Link to="/" className={styles.nameApp}>ZWIERZAPP
        <img src={paw}></img></Link>
      </div>
      <div className={styles.menuNav}>
        <ScrollTrigger to="aboutUs" className={styles.linkElemenets} smooth={true} duration={500}>O nas</ScrollTrigger>
        <ScrollTrigger to="contact" className={styles.linkElemenets} smooth={true} duration={600}>Kontakt</ScrollTrigger>

        {currentUser ? (
          <>
            <Link to="/profile" className={styles.linkElemenets}>Profil</Link>
            <Link to="/filter" className={styles.linkElemenets}>Znajdź Petsittera</Link>
            <Link to="/" className={styles.linkElemenets} onClick={logout}>Wyloguj się</Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.linkElemenets}>Zaloguj się</Link>
            <Link to="/register" className={styles.linkElemenets}>Zarejestruj się</Link>
          </>
        )}
      </div>
    </div>

  )
}

export default NavBar;
