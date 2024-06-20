import { useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import AddAvatar from "./AddAvatar/AddAvatar";
import styles from "./addDataForm.module.scss";

const AddDataForm = () => {
  const { savePersonalData, currentUser } = useAuth() || {};
  const navigate = useNavigate();
  console.log(currentUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const surname = formData.get("surname");
    const city = formData.get("city");
    const phone = formData.get("phone");
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
      console.error(e); // Hot toast
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.boxLogin}>
        <h1>UZUPEŁNIJ DANE</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <AddAvatar />
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
          <input
            autoComplete="on"
            type="text"
            name="city"
            placeholder="MIASTO"
            required
          />
          <button type="submit">ZAPISZ ZMIANY</button>
        </form>
      </div>
    </div>
  );
};

export default AddDataForm;
