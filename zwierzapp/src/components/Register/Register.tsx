import styles from "./register.module.scss";
import {Link, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../context/AuthContext";

function Register() {

  const { register, authenticateWithGoogle, currentUser } = useAuth() ?? {};
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const pwd = formData.get("password");
    const cpwd = formData.get("confirm_password");
    const name = formData.get("name");
    const surname = formData.get("surname");


    //sprawdzenie czy wszystkie pola są wypełnione
    if (![email, pwd, cpwd, name, surname].every(value => typeof value === "string" && value.trim() !== "")) {
      console.error("Wszystkie pola muszą być wypełnione!"); // toast
      return;
    }
    //sprawdzenie czy hasła są takie same
    if(pwd !== cpwd){
      console.log("Hasła muszą być takie same!") //toast
      return
    }
    if (!register) {
      return;
    }
    try {
      register(email as string, pwd as string)
    } catch (e) {
      console.error(e); //toast
    }
  }
  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate])


  return (
    <div className={styles.registerContainer}>
        <article className={styles.register}>
          <Link to="/">⬅️ WRÓĆ NA STRONĘ GŁÓWNĄ</Link>
          <h2>Dołącz do nas!</h2>

          <form onSubmit={handleSubmit}>

            <label htmlFor="email">
              <input type="email" name="email" id="email" placeholder="ADRES E-MAIL"/>
            </label>

            <label htmlFor="password">
              <input type="password" name="password" id="password" placeholder="HASŁO" autoComplete="on"/>
            </label>
          
            <label htmlFor="confirm_password">
              <input type="password" name="confirm_password" id="confirm_password" placeholder="POWTÓRZ HASŁO " autoComplete="on"/>
            </label>

            <label htmlFor="name">
              <input type="text" name="name" id="name" placeholder="IMIĘ"/>
            </label>

            <label htmlFor="surname">
              <input type="text" name="surname" id="surname" placeholder="NAZWISKO"/>
            </label>
          
            <button type="submit">Zarejestruj się!</button>
          </form>
          <div>
            <span>LUB</span>
            <button onClick={authenticateWithGoogle}>Zarejestruj się kontem Google!</button>
          </div>
        </article>

    </div>
  )
}

export default Register