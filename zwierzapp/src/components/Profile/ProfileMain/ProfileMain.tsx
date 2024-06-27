import styles from "./ProfileMain.module.scss";
import PriceSection from "./PriceSection";
import useAuth, { User } from "../../../context/AuthContext";
import PetSection from "./PetSection";
import { useEffect, useState } from "react";
import getUserData from "../../../hooks/getUserData";

function ProfileMain(passedData: { uid?: string }) {
  const { currentUser }: { currentUser: User | null } = useAuth() || {
    currentUser: null,
  };
  const [user, setUser] = useState<User | null>(null);
  const uid: string = passedData.uid || "";
  const passedUser: User | null = getUserData({ uid });
  useEffect(() => {
    if (passedUser) {
      setUser(passedUser);
    } else {
      setUser(currentUser);
    }
  }, [passedUser]);

  return (
    <main className={styles.container}>
      <div className={styles.top}>
        <h1>
          {user ? `${user.name} ${user.surname}` : "Anonimowy użytkownik"}
        </h1>
        {(user && <p>{user.descLong}</p>) || <button>Dodaj opis</button>}
      </div>
      <PriceSection />
      <PetSection />
      <button>Edytuj dane</button>
    </main>
  );
}

export default ProfileMain;
