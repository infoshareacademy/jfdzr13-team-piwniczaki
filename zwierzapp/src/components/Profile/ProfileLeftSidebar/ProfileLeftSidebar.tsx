import { useState } from "react";
import useAuth from "../../../context/AuthContext";
import styles from "./ProfileLeftSidebar.module.scss";

const ProfileLeftSidebar = () => {
  const { currentUser, savePersonalData } = useAuth() || {};
  console.log(currentUser);

  const [inputs, setInputs] = useState({
    name: currentUser.name, // ostatni etap
    surname: currentUser.surname,
    phone: currentUser.phone,
    city: currentUser.city,
  });

  const handleUpdateData = async (e) => {
    e.preventDefault();
    await savePersonalData(inputs); // w momencie jak ktoś kliknie zapisz
  };

  return (
    <>
      <div className={styles.container}>
        ProfileLeftSidebar
        <h1>UZUPEŁNIJ DANE</h1>
        <form className={styles.formContainer} onSubmit={handleUpdateData}>
          {/* jak zaktualizuję "zapiszę" */}
          <input
            type="text"
            name="name"
            placeholder="IMIĘ"
            required
            value={inputs.name}
            onChange={
              (e) => setInputs((prev) => ({ ...prev, name: e.target.value })) // kopiuję wartości obiektu/wszystkich inputów i ustawiam na nowo w zależnosci od danych pobranych
            }
          />
          <input
            autoComplete="on"
            type="text"
            name="surname"
            placeholder="NAZWISKO"
            required
            value={inputs.surname}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, surname: e.target.value }))
            }
          />
          <input
            autoComplete="on"
            type="tel"
            name="phone"
            placeholder="NUMER TELEFONU"
            required
            value={inputs.phone}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
          <input
            autoComplete="on"
            type="text"
            name="city"
            placeholder="MIASTO"
            required
            value={inputs.city}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, city: e.target.value }))
            }
          />
          <button type="submit">ZAPISZ ZMIANY</button>
        </form>
      </div>
    </>
  );
};

export default ProfileLeftSidebar;
