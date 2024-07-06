import styles from './PetsitterBar.module.scss'
import useFindPetsitters from '../../../hooks/useFindPetsitters';
import { useLocation } from 'react-router';
interface PetsitterBarProps {
    sorting: {
      byName: boolean;
      byPrice: boolean;
      asc: boolean;
      desc: boolean;
    };
    serviceType: string;
    race: string;
  }

const PetsitterBar: React.FC<PetsitterBarProps> = ({ sorting, serviceType, race }) => {
    const location = useLocation();
    const sortedPetsitters = useFindPetsitters(sorting)
    console.log('sortedpetsitters', sortedPetsitters)

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
    const hasSearchParams = new URLSearchParams(location.search).toString() !== '';

    return (
        <div>
          {!hasSearchParams ? (
            <div>
              <h1>Znajdź idealnego opiekuna dla swojego zwierzaka!</h1>
            </div>
          ) : sortedPetsitters[1] && sortedPetsitters[1].length > 0 ? (
            sortedPetsitters[1].map((petsitter) => (
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

