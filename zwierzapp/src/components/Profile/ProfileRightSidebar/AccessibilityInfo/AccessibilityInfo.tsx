import styles from "./AccessibilityInfo.module.scss"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useFirebaseData from '../../../../hooks/useFirebaseData'
import useAuth from "../../../../context/AuthContext";

const AccessibilityInfo = () => {
  const { currentUser } = useAuth() || {};
  const [isPetSitter, setPetsitter] = useState(false);
  const [isThereADate, setDates] = useState(false);
  const [accesDates, setAccesDates] = useState<{ startDate: string, endDate: string }[]>([]);
  const database: { userId: string[]; access: { startDate: string; endDate: string }[] }[] = useFirebaseData("Petsitters");

  const transformDate = (dateStr) => {
    const parts = dateStr.split('-');
    return `${parts[1]}-${parts[0]}`;
  };

  useEffect(() => {
    database.forEach((element) => {
      const isHeInDatabase = element.userId.includes(currentUser.uid);
      if (isHeInDatabase) {
        if (element.access) {
          const transformedAccess = element.access.map(access => ({
            startDate: transformDate(access.startDate.replace('2024-', '')),
            endDate: transformDate(access.endDate.replace('2024-', ''))
          }));
          setAccesDates(transformedAccess);
          if(accesDates.length > 0){
            setDates(true);
          }
        }
        setPetsitter(true);
      }
    });
  }, [currentUser.uid, database, accesDates.length]);

  return (
    <div className={styles.accessContainer}>
      {isPetSitter ? (
        <div className={styles.listOfAcces}>
          {isThereADate ? (
            <>
              <span className={styles.tittleAcc}>Dostępność</span>
              {
                accesDates.map((date, index) => (
                  <div key={index}>
                    <p className={styles.dateElement}>Od {date.startDate} Do {date.endDate}</p>
                  </div>
                ))
              }
            </>
          ) : (
            <>
              Coś tu pusto
            </>
          )}
          <Link to="/addcare" className={styles.becomePetSitterLink}>
            Zarządzaj dostępnością
          </Link>
        </div>
      ) : (
        <Link to="/" className={styles.becomePetSitterLink}>Zostań petsitterem</Link>
      )}
    </div>
  );
}

export default AccessibilityInfo;
