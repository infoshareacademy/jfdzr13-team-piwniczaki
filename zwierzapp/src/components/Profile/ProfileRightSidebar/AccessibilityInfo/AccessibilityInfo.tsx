import styles from "./AccessibilityInfo.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../context/AuthContext";
import { db } from "../../../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Loading from "../../../Loading/Loading";
import getPetsitterData from "../../../../hooks/getPetsitterData";

const AccessibilityInfo = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth() || {};
  const [isPetSitter, setPetsitter] = useState(false);
  const [isThereADate, setDates] = useState(false);
  const [accessDates, setAccessDates] = useState<
    { startDate: string; endDate: string }[]
  >([]);
  const databasePetsitter = getPetsitterData(currentUser.uid);

  const transformDate = (dateStr: string) => {
    const parts = dateStr.split("-");
    return `${parts[1]}-${parts[0]}`;
  };

  useEffect(() => {
    const fetchAccessDates = async (docId) => {
      const accessCollectionRef = collection(db, "Petsitters", docId, "access");
      const snapshot = await getDocs(accessCollectionRef);
      const dates = snapshot.docs.map((doc) => doc.data());
      const transformedAccess = dates.map((access) => ({
        startDate: transformDate(access.startDate.replace("2024-", "")),
        endDate: transformDate(access.endDate.replace("2024-", "")),
      }));
      setAccessDates(transformedAccess);
      setDates(transformedAccess.length > 0);
      setLoading(false);
    };

    if (databasePetsitter && databasePetsitter.userId) {
      setPetsitter(true);
      fetchAccessDates(databasePetsitter.id);
    } else {
      setLoading(false);
    }
  }, [databasePetsitter]);

  if (loading) {
    return <Loading message="Ładowanie danych..." />;
  }

  return (
    <>
      {isPetSitter ? (
        <div className={styles.accessContainer}>
          <div className={styles.listOfAccess}>
            {isThereADate ? (
              <>
                <span className={styles.titleAccess}>Dostępność</span>
                {accessDates.map((date, index) => (
                  <div key={index}>
                    <p className={styles.dateElement}>
                      Od {date.startDate} Do {date.endDate}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <>Coś tu pusto</>
            )}
            <Link to="/addcare" className={`${styles.becomePetSitterLink} ${styles.primaryButton}`}>
              Zarządzaj dostępnością
            </Link>
          </div>
        </div>
      ) : (
        <Link to="/addpetsitter" className={`${styles.becomePetSitterLink} ${styles.primaryButton}`}>
          Zostań petsitterem
        </Link>
      )}
      </>
  );
};

export default AccessibilityInfo;
