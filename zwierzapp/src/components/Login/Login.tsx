import styles from "./login.module.scss";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../../context/AuthContext"
import googleLogo from "../../images/googleLogo.svg"



const Login = () => {
  const { loginWithGoogle, login, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const pwd = formData.get("password");

    try {
      await login(email, pwd);
    } catch (e) {
      console.error(e); // Hot toast ma być
    }

  }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate])

  return (
    <div className={styles.loginContainer}>
      <div className={styles.boxLogin}>
        <h1>WITAJ!</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input type="email" name="email" placeholder="ADRES MAIL" required />
          <input type="password" name="password" placeholder="HASŁO" required />
          <button type="submit">ZALOGUJ SIĘ</button>
        </form>
        <div className={styles.orContainer}>
          <div className={styles.lineElement}></div>
          <p>LUB</p>
          <div className={styles.lineElement}></div>
        </div>
        <button className={styles.googleLogin} onClick={loginWithGoogle}><img className={styles.googleLogo} src={googleLogo} />KONTYNUUJ Z UŻYCIEM KONTA GOOGLE</button>
        <Link to="/register" className={styles.registerLink}>NIE MASZ KONTA? ZAREJESTRUJ SIĘ!</Link>
      </div>
    </div>
  );
}

export default Login;
