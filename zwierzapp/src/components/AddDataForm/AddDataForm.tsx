import { useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import styles from "./addDataForm.module.scss";

const AddDataForm = () => {
  const { currentUser, savePersonalData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const surname = formData.get("surname");
    const city = formData.get("city");
    const phone = formData.get("phone");
    // powyżej wyciągam dane
    const additionalUserData = {
      name,
      surname,
      city,
      phone,
    };

    try {
      await savePersonalData(additionalUserData);
      navigate("/profile");
    } catch (e) {
      console.error(e); // Hot toast ma być
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.boxLogin}>
        <h1>UZUPEŁNIJ DANE</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input type="text" name="name" placeholder="IMIĘ" required />
          <input
            autoComplete="on"
            type="text"
            name="surname"
            placeholder="NAZWISKO"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="NUMER TELEFONU"
            required
          />
          <input type="text" name="city" placeholder="MIASTO" required />
          <button type="submit">ZAPISZ ZMIANY</button>
        </form>
      </div>
    </div>
  );
};

export default AddDataForm;
