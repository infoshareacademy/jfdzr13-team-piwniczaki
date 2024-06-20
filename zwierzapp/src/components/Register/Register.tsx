import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import googleLogo from "../../images/googleLogo.svg";
import styles from "./register.module.scss";

function Register() {
  const { register, authenticateWithGoogle, currentUser } = useAuth() ?? {};
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string | null;
    const pwd = formData.get("password") as string | null;
    const cpwd = formData.get("confirm_password") as string | null;

    if (
      ![email, pwd, cpwd].every(
        (value): value is string =>
          typeof value === "string" && value.trim() !== ""
      )
    ) {
      toast.error("Wszystkie pola muszą być wypełnione!");
      return;
    }

    if (pwd && pwd.length < 6) {
      toast.error("Hasło musi składać się z min. 6 znaków!");
      return;
    }
    if (pwd !== cpwd) {
      toast.error("Hasła muszą być takie same!");
      return;
    }
    if (!register) {
      return;
    }
    try {
      register(email as string, pwd as string);
    } catch (e) {
      toast.error("Rejestracja się nie powiodła");
    }
  };
  useEffect(() => {
    if (currentUser) {
      navigate("/personal-data");
    }
  }, [currentUser, navigate]);

  return (
    <div className={styles.registerPage}>
      <article className={styles.registerContainer}>
        <h2> UTWÓRZ KONTO</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ADRES E-MAIL"
            />
          </label>

          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="HASŁO"
              autoComplete="on"
            />
          </label>

          <label htmlFor="confirm_password">
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="POWTÓRZ HASŁO "
              autoComplete="on"
            />
          </label>

          <button type="submit" className={styles.orangeBtn}>
            ZAREJESTRUJ SIĘ
          </button>
        </form>
        <div className={styles.orContainer}>
          <div className={styles.line}></div>
          <p className={styles.or}>LUB</p>
          <div className={styles.line}></div>
        </div>
        <button onClick={authenticateWithGoogle} className={styles.googleBtn}>
          <img className={styles.googleLogo} src={googleLogo} />
          KONTYNUUJ Z UŻYCIEM KONTA GOOGLE
        </button>
      </article>
    </div>
  );
}

export default Register;
