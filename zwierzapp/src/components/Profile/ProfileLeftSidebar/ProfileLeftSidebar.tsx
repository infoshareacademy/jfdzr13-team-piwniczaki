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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          <AddAvatar />
        </div>
        {isEditing ? (
          <form
            className={styles.formContainerProfile}
            onSubmit={handleUpdateData}
          >
            <input
              autoComplete="on"
              type="tel"
              name="phone"
              placeholder="NUMER TELEFONU"
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
              value={inputs.city}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, city: e.target.value }))
              }
            />
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
            <button
              className={`${styles.editButton} ${styles.primaryButton}`}
              type="submit"
            >
              Zapisz zmiany
            </button>
          </form>
        ) : (
          <div className={styles.formContainerProfile}>
            <p className={styles.formContainerPara}>{inputs.phone}</p>
            <p className={styles.formContainerPara}>{inputs.city}</p>
            {inputs.shortDescription ? (
              <p className={styles.formContainerPara}>
                {inputs.shortDescription}
              </p>
            ) : null}
            <button
              className={`${styles.editButton} ${styles.primaryButton}`}
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edytuj dane
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileLeftSidebar;
