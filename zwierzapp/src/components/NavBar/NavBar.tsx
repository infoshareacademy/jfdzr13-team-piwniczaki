import styles from "./navBar.module.scss";
import paw from "../../images/Paw.svg";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import { Link as ScrollTrigger } from 'react-scroll';
import { useEffect, useState } from "react";
import NavProfile from "./NavProfile/NavProfile";

function NavBar() {
  const location = useLocation();
  const { currentUser } = useAuth() || {};
  const [isOnMainPage, setMain] = useState(false);
  const [isOnLog, setLog] = useState(false);
  const [isOnReg, setReg] = useState(false);

  useEffect(() => {
    { location.pathname === '/' ? setMain(true) : setMain(false) }
    { location.pathname === '/login' ? setLog(true) : setLog(false) }
    { location.pathname === '/register' ? setReg(true) : setReg(false) }
  }, [location.pathname]);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoAndNameNav}>
        <Link to="/" className={styles.nameApp}>
          ZWIERZAPP
          <img src={paw} alt="Paw logo" />
        </Link>
      </div>
      <div className={styles.menuNav}>
        {isOnMainPage ? (
          <>
            <ScrollTrigger to="aboutUs" className={styles.linkElemenets} smooth="true" duration={700}>
              O nas
            </ScrollTrigger>
            <ScrollTrigger to="contact" className={styles.linkElemenets} smooth="true" duration={800}>
              Kontakt
            </ScrollTrigger>
          </>
        ) : (
          <>
            <Link to="/" className={styles.linkElemenets}>Strona Główna</Link>
          </>

        )}
        {currentUser ? (
          <>
            <Link to="/filter" className={styles.linkElemenets}>Znajdź Petsittera</Link>
            <NavProfile />
            <Link to="/addpetsitter">Addpetsitter</Link>
          </>
        ) : (
          <>
            {isOnLog ? (
              <>
                <Link to="/register" className={styles.linkElemenets}>Zarejestruj się</Link>
              </>
            ) : (
              <>
                {isOnReg ? (
                  <>
                    <Link to="/login" className={styles.linkElemenets}>Zaloguj się</Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={styles.linkElemenets}>Zaloguj się</Link>
                    <Link to="/register" className={styles.linkElemenets}>Zarejestruj się</Link>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
