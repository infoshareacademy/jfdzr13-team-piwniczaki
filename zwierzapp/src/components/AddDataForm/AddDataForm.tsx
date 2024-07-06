import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth, { AdditionalUserInfo } from "../../context/AuthContext";
import styles from "../AddDataForm/addDataForm.module.scss";
import AddAvatar, { avatars } from "./AddAvatar/AddAvatar";

const AddDataForm = () => {
  const { savePersonalData, currentUser, avatar } = useAuth() || {}; // pusty obiekt zwróci się wtedy kiedy w useAuth mamy null (pustą wartość)
  const navigate = useNavigate();

  console.log(currentUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const city = formData.get("city") as string;
    const phone = formData.get("phone") as string;
    const email = currentUser.email as string;
    const additionalUserData: AdditionalUserInfo = {
      name,
      surname,
      city,
      phone,
      email,
      avatar: avatar ?? avatars[0],
    };

    if (
      ![name, surname, city, phone].every(
        (value): value is string =>
          typeof value === "string" && value.trim() !== ""
      )
    ) {
      toast.error("Wszystkie pola muszą być wypełnione!");
      return;
    }

    try {
      if (savePersonalData !== undefined)
        await savePersonalData(additionalUserData);
      navigate("/profile");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.boxLogin}>
        <h1>UZUPEŁNIJ DANE</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.avatarMainContainer}>
            <AddAvatar />
          </div>
          <input maxLength={15} type="text" name="name" placeholder="IMIĘ" />
          <input
            maxLength={30}
            autoComplete="on"
            type="text"
            name="surname"
            placeholder="NAZWISKO"
          />
          <input
            maxLength={9}
            autoComplete="on"
            type="tel"
            name="phone"
            placeholder="NUMER TELEFONU"
          />
          <input
            maxLength={30}
            autoComplete="on"
            type="text"
            name="city"
            placeholder="MIASTO"
          />
          <button
            className={`${styles.saveChangesButton} ${styles.primaryButton}`}
            type="submit"
          >
            ZAPISZ ZMIANY
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDataForm;
