import styles from "./ProfileMain.module.scss";
import PriceSection from "./PriceSection";
import useAuth, { User } from "../../../context/AuthContext";
import PetSection from "./PetSection";
import { useEffect, useState } from "react";
import getUserData from "../../../hooks/getUserData";
import { Link } from "react-router-dom";
import DescSection from "./DescSection";
import getPetsitterData, {
  PetsitterDocument,
} from "../../../hooks/getPetsitterData";


function ProfileMain(passedData: { uid?: string }) {
  const petsitterDocument: PetsitterDocument | null = getPetsitterData();
  const { currentUser }: { currentUser: User | null } = useAuth() || {
    currentUser: null,
  };
  const [user, setUser] = useState<User | null>(null);
  const uid: string = passedData.uid || "";
  const passedUser: User | null = getUserData(uid);
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
        <h1 className={styles.nameProfile}>
          {user ? `Cześć, ${user.name} ${user.surname}!` : "Cześć, Anonimowy użytkowniku!"}
        </h1>
        <DescSection/>
      </div>
      <PetSection />
      <PriceSection />
      {petsitterDocument &&
        petsitterDocument.checkboxes &&
        (petsitterDocument.checkboxes.cat ||
          petsitterDocument.checkboxes.dog ? (
          <div className={styles.buttonConainter}>
            <Link to="/addpetsitter" className={`${styles.editButton} ${styles.primaryButton}`}>
              Edytuj dane
            </Link>
          </div>
        ) : null)}
    </main>
  );
}

export default ProfileMain;
