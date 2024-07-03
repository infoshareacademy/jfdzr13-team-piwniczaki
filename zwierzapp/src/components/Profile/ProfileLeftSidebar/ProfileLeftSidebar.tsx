import { useState } from "react";
import useAuth from "../../../context/AuthContext";
import AddAvatar from "../../AddDataForm/AddAvatar/AddAvatar";
import styles from "./ProfileLeftSidebar.module.scss";

const ProfileLeftSidebar = () => {
  const { currentUser, savePersonalData } = useAuth() || {};
  const [isEditing, setIsEditing] = useState(false);

  const [inputs, setInputs] = useState({
    avatar: currentUser.avatar,
    name: currentUser.name,
    surname: currentUser.surname,
    phone: currentUser.phone,
    city: currentUser.city,
    shortDescription: currentUser.shortDescription,
  });

  const handleUpdateData = async (e) => {
    e.preventDefault();
    await savePersonalData(inputs);
    setIsEditing(false);
  };

  console.log({ currentUser });

  return (
    <>
      <div className={styles.container}>
        {isEditing ? (
          <form className={styles.formContainer} onSubmit={handleUpdateData}>
            <AddAvatar />
            <textarea
              className={styles.shortDescription}
              id="shortDescription"
              name="shortDescription"
              value={inputs.shortDescription}
              placeholder="Dodaj krótki opis"
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  shortDescription: e.target.value,
                }))
              }
            ></textarea>
            <input
              type="text"
              name="name"
              placeholder="IMIĘ"
              required
              value={inputs.name}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, name: e.target.value }))
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
            <button className={styles.saveChangesButton} type="submit">
              Zapisz zmiany
            </button>
          </form>
        ) : (
          <>
            <AddAvatar isEditing={true} />
            <p>
              <strong>IMIĘ:</strong> {inputs.name}
            </p>
            <p>
              <strong>NAZWISKO:</strong> {inputs.surname}
            </p>
            <p>
              <strong>NUMER TELEFONU:</strong> {inputs.phone}
            </p>
            <p>
              <strong>MIASTO:</strong> {inputs.city}
            </p>
            <p>
              <strong>OPIS:</strong> {inputs.shortDescription}
            </p>
            <button
              className={styles.editButton}
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edytuj dane
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileLeftSidebar;
