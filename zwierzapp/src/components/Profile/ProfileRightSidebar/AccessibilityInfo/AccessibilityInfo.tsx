import styles from "./AccessibilityInfo.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../context/AuthContext";
import getPetsitterData from '../../../../hooks/getPetsitterData';

const AccessibilityInfo = () => {
  const { currentUser } = useAuth() || {};
  const [isPetSitter, setPetsitter] = useState(false);
  const [isThereADate, setDates] = useState(false);
  const [accesDates, setAccesDates] = useState<{ startDate: string, endDate: string }[]>([]);
  const databasePetsitter = getPetsitterData(currentUser.uid);

  const transformDate = (dateStr:string) => {
    const parts = dateStr.split('-');
    return `${parts[1]}-${parts[0]}`;
  };

  useEffect(() => {
    if (databasePetsitter && databasePetsitter.access) {
      setPetsitter(true)
      const transformedAccess = databasePetsitter.access.map(access => ({
        startDate: transformDate(access.startDate.replace('2024-', '')),
        endDate: transformDate(access.endDate.replace('2024-', ''))
      }));
      setAccesDates(transformedAccess);
      setDates(transformedAccess.length > 0);
    }
  }, [databasePetsitter]); 

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
        <Link to="/addpetsitter" className={styles.becomePetSitterLink}>Zostań petsitterem</Link>
      )}
    </div>
  );
};

export default AccessibilityInfo;