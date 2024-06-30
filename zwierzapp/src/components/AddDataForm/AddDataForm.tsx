import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth, { AdditionalUserInfo } from "../../context/AuthContext";
import AddAvatar from "./AddAvatar/AddAvatar";
import styles from "./addDataForm.module.scss";

const AddDataForm = () => {
  const { savePersonalData, currentUser } = useAuth() || {}; // pusty obiekt zwróci się wtedy kiedy w useAuth mamy null (pustą wartość)
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(""); // dodałam stan do rodzica
  console.log(currentUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const city = formData.get("city") as string;
    const phone = formData.get("phone") as string;
    const additionalUserData: AdditionalUserInfo = {
      name,
      surname,
      city,
      phone,
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

  console.log(avatar);

  // one way data binding, jednostronny przepływ danych w React, tzn. rodzic może przekazać coś dziecku, ale dziecko nie może przekazać rodzicowi.
  // Jeśli istnieje potrzeba aby rodzic otrzymał od dziecka stan i zmiany tego stanu to jedyna możliwość polega na tym aby stworzyć stan w rodzicu i przekazać stan i funkcję zmieniającą stan do dziecka w formie propsów!!!!!! REDUX przechowywanie stanu globalnego.

  return (
    <div className={styles.loginContainer}>
      <div className={styles.boxLogin}>
        <h1>UZUPEŁNIJ DANE</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <AddAvatar avatar={avatar} setAvatar={setAvatar} />
          {/* tutaj przekazuję propsy dzieciakowi */}
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
          <button className={styles.saveChangesButton} type="submit">
            ZAPISZ ZMIANY
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDataForm;
