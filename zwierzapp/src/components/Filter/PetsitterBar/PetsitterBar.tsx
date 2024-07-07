import { User } from "firebase/auth";
import styles from "./PetsitterBar.module.scss";
import { useLocation } from "react-router";
import useAuth from "../../../context/AuthContext";
interface PetsitterBarProps {
  serviceType: string | null | undefined;
  race: string;
  petsitters: any[];
  filters: any;
}

const PetsitterBar: React.FC<PetsitterBarProps> = ({
  serviceType,
  race,
  petsitters,
  filters,
}) => {
  const { currentUser }: { currentUser: User | null } = useAuth() || {
    currentUser: null,
  };

  const getPriceForService = (petsitter: any) => {
    if (!petsitter) return 0;
    switch (serviceType) {
      case "walk":
        return race === "dog"
          ? petsitter.prices.dogWalkPrice
          : petsitter.prices.catWalkPrice;
      case "accom":
        return race === "dog"
          ? petsitter.prices.dogAccomPrice
          : petsitter.prices.catAccomPrice;
      case "homeVisit":
        return race === "dog"
          ? petsitter.prices.dogHomeVisitPrice
          : petsitter.prices.catHomeVisitPrice;
      default:
        return 0;
    }
  };
  return (
    <div>
      {location.pathname === '/search' && location.search === '' && (
        <div>
          <h1>Znajdź idealnego opiekuna dla swojego zwierzaka!</h1>
        </div>
      )}
      {petsitters && petsitters.length > 0 ? (
        petsitters.map((petsitter) => (
          <div key={petsitter.id} className={styles.petsitterCard}>
            <img src="/src/assets/Avatars/Avatar%201.svg" alt={petsitter?.userData?.avatar?.alt} />
            <div className={styles.petsitterInfo}>
              <h1>{`${petsitter?.userData?.name} ${petsitter?.userData?.surname}`}</h1>
              <p>{petsitter?.userData?.shortDescription}</p>
            </div>
            <div className={styles.serviceInfo}>
              <div className={styles.price}>
                <span className={styles.sum}>suma</span>
                <span className={styles.amount}>{` ${getPriceForService(petsitter)} zł`}</span>
              </div>
              <button className={`${styles.askButton} ${styles.primaryButton}`}>Wyślij zapytanie</button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noPetsitters}>
          <h1>Nie znaleziono opiekunów :(</h1>
        </div>
      )}
  </div>

    );
};
export default PetsitterBar;
