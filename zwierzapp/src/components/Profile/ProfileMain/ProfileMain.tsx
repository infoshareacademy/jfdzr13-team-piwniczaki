import styles from "./ProfileMain.module.scss";
import PriceSection from "./PriceSection";
import useAuth, { User } from "../../../context/AuthContext";
import PetSection from "./PetSection";

function ProfileMain() {
  const { currentUser }: { currentUser: User | null } = useAuth() || {
    currentUser: null,
  };
  return (
    <main className={styles.container}>
      <div className={styles.top}>
        <h1>
          {currentUser
            ? `${currentUser.name} ${currentUser.surname}`
            : "Anonimowy użytkownik"}
        </h1>
        {(currentUser && <p>{currentUser.descLong}</p>) || (
          <button>Dodaj opis</button>
        )}
      </div>
      <PriceSection />
      <PetSection />
      <button>Edytuj dane</button>
    </main>
  );
}

export default ProfileMain;
