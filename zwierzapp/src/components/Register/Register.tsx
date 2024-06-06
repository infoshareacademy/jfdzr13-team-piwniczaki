import styles from "./register.module.scss";
import {Link} from "react-router-dom";

function Register() {

  const handleSubmit = () => {

  }


  return (
    <div className={styles.registerContainer}>
        <article className={styles.register}>
          <button>⬅️ WRÓĆ NA STRONĘ GŁÓWNĄ</button>
          <h2>Dołącz do nas!</h2>

          <form onSubmit={handleSubmit}>

            <label htmlFor="email">
              <input type="email" name="email" id="email" placeholder="ADRES E-MAIL"/>
            </label>

            <label htmlFor="password">
              <input type="password" name="password" id="password" placeholder="HASŁO "/>
            </label>
          
            <label htmlFor="confirm_password">
              <input type="password" name="confirm_password" id="confirm_password" placeholder="POWTÓRZ HASŁO "/>
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
            <button>Zarejestruj się kontem Google!</button>
          </div>
        </article>

    </div>
  )
}

export default Register