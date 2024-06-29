import styles from "./AccessibilityInfo.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../context/AuthContext";
import getPetsitterData from '../../../../hooks/getPetsitterData';
import Loading from "../../../Loading/Loading";

const AccessibilityInfo = () => {
  const [ isLoading, setLoading ] = useState(true)
  const { currentUser } = useAuth() || {};
  const [isPetSitter, setPetsitter] = useState(false);
  const [isThereADate, setDates] = useState(false);
  const [accesDates, setAccesDates] = useState<{ startDate: string, endDate: string }[]>([]);
  const databasePetsitter = getPetsitterData(currentUser.uid);
  console.log(databasePetsitter)
  const transformDate = (dateStr:string) => {
    const parts = dateStr.split('-');
    return `${parts[1]}-${parts[0]}`;
  };

  useEffect(() => {
    if (databasePetsitter && databasePetsitter.userId) {
      setPetsitter(true);
      if (databasePetsitter.access) {
        console.log(databasePetsitter);
        setPetsitter(true);
        setLoading(false)
        const transformedAccess = databasePetsitter.access.map(access => ({
          startDate: transformDate(access.startDate.replace('2024-', '')),
          endDate: transformDate(access.endDate.replace('2024-', ''))
        }));
        setAccesDates(transformedAccess);
        setDates(transformedAccess.length > 0);
        setLoading(false)
      }
    }
    setLoading(false)
  }, [databasePetsitter]);
  if(isLoading){
    return <Loading message="Pobieranie dat"/>
  }

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