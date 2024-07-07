import { NavLink } from "react-router-dom";
import useAuth from "../../../context/AuthContext";
import styles from "../WelcomePage/welcomePage.module.scss";

const WelcomePage = () => {
  const { currentUser } = useAuth() || {};

  return (
    <main className={styles.sectionsWrapper}>
      <section className={styles.welcomePageWrapper}>
        <p>
          Znajdź najlepszą opiekę dla swojego
          <span className={styles.zwierzakText}> zwierzaka </span> z naszą
          aplikacją
        </p>
        {!currentUser && (
          <NavLink to="/register">
            <button className={styles.buttonZarejestruj}>
              Zarejestruj się!
            </button>
          </NavLink>
        )}
      </section>
    </main>
  );
};

export default WelcomePage;
