import styles from "./ProfileMain.module.scss";
import PriceSection from "./PriceSection";
import useAuth, { User } from "../../../context/AuthContext";
import PetSection from "./PetSection";
import { useEffect, useState } from "react";
import getUserData from "../../../hooks/getUserData";
import { Link } from "react-router-dom";
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
      </div>
      <PetSection />
      <PriceSection />
      {petsitterDocument &&
        petsitterDocument.checkboxes &&
        (petsitterDocument.checkboxes[0].cat ||
        petsitterDocument.checkboxes[0].dog ? (
          <Link to="/addpetsitter">
            <button>Edytuj dane</button>
          </Link>
        ) : null)}
    </main>
  );
}

export default ProfileMain;
