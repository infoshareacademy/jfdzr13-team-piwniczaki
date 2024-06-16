import React from 'react'
import styles from "./ProfileLeftSidebar.module.scss";

const ProfileLeftSidebar = () => {
    return (
        <>
        <div className={styles.container}>
            ProfileLeftSidebar
            <h1>UZUPEŁNIJ DANE</h1>
        <form className={styles.formContainer}>
          <input type="text" name="name" placeholder="IMIĘ" required />
          <input
            autoComplete="on"
            type="text"
            name="surname"
            placeholder="NAZWISKO"
            required
          />
          <input
            autoComplete="on"
            type="tel"
            name="phone"
            placeholder="NUMER TELEFONU"
            required
          />
          <input autoComplete="on" type="text" name="city" placeholder="MIASTO" required />
          <button type="submit">ZAPISZ ZMIANY</button>
        </form>
        </div>
        </>
    )
}

export default ProfileLeftSidebar
