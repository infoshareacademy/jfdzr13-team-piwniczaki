import styles from './PetsitterBar.module.scss'
import { useLocation } from 'react-router';
interface PetsitterBarProps {
    serviceType: string | null | undefined;
    race: string;
    petsitters: any[];
  }

const PetsitterBar: React.FC<PetsitterBarProps> = ({serviceType, race, petsitters }) => {



  // Funkcja zwracająca cenę usługi dla konkretnego opiekuna
    const getPriceForService = (petsitter: any) => {
        if (!petsitter) return 0;
        switch (serviceType) {
        case "walk":
            return race === "dog" ? petsitter.prices.dogWalkPrice : petsitter.prices.catWalkPrice;
        case "accom":
            return race === "dog" ? petsitter.prices.dogAccomPrice : petsitter.prices.catAccomPrice;
        case "homeVisit":
            return race === "dog" ? petsitter.prices.dogHomeVisitPrice : petsitter.prices.catHomeVisitPrice;
        default:
            return 0;
        }
    };

    return (
        <div>
            <div>
              <h1>Znajdź idealnego opiekuna dla swojego zwierzaka!</h1>
            </div>
                {petsitters && petsitters.length > 0 ? (
            petsitters.map((petsitter) => (
              <div key={petsitter.id} className={styles.petsitterCard}>
                <img src={petsitter?.userData?.avatar?.photo} alt={petsitter?.userData?.avatar?.alt}/>
                <div>
                  <h1>{`${petsitter?.userData?.name} ${petsitter?.userData?.surname}`}</h1>
                  <p>{petsitter?.userData?.shortDescription}</p>
                </div>
                <div>
                  <span>{`Suma ${getPriceForService(petsitter)} zł`}</span>
                  <button>Wyślij zapytanie</button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>Nie znaleziono opiekunów :(((( </h1>
            </div>
          )}
        </div>
      );
    }
export default PetsitterBar

