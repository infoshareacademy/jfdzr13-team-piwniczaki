import styles from "./PetsitterBar.module.scss";
import useFindPetsitters from "../../../hooks/useFindPetsitters";
import { useLocation } from "react-router";
import { User } from "firebase/auth";
import useAuth from "../../../context/AuthContext";
interface PetsitterBarProps {
  serviceType: string | null | undefined;
  race: string;
  petsitters: any[];
}

const PetsitterBar: React.FC<PetsitterBarProps> = ({
  serviceType,
  race,
  petsitters,
}) => {
  // Funkcja zwracająca cenę usługi dla konkretnego opiekuna
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
      {!hasSearchParams ? (
        <div>
          <h1>Znajdź idealnego opiekuna dla swojego zwierzaka!</h1>
        </div>
      ) : sortedPetsitters[1] && sortedPetsitters[1].length > 0 ? (
        sortedPetsitters[1].map((petsitter) => (
          <div key={petsitter.id} className={styles.petsitterCard}>
            <img
              src={petsitter?.userData?.avatar?.photo}
              alt={petsitter?.userData?.avatar?.alt}
            />
            <div>
              <h1>{`${petsitter?.userData?.name} ${petsitter?.userData?.surname}`}</h1>
              <p>{petsitter?.userData?.shortDescription}</p>
            </div>
            <div>
              <span>{`Suma ${getPriceForService(petsitter)} zł`}</span>
              {petsitter?.userData?.email ? (
                <button>
                  <a
                    href={`mailto:${petsitter?.userData?.email}?subject=${
                      filters?.petName
                    } poszukuje opieki! | Zwierzapp&body=Cześć ${
                      petsitter?.userData?.name
                    }!%0D%0A%0D%0A${
                      filters?.petName
                    } portrzebuje Twojej opieki w terminie od ${
                      filters?.startDate
                    } do ${
                      filters?.endDate
                    }%0D%0ASkontaktuj się z właścicielem jak najszybciej, jezeli jesteś zainteresowany opieką.%0D%0A %0D%0A Dane opiekuna: %0D%0A${
                      currentUser?.name
                    } ${currentUser?.surname}%0D%0AAdres mail: ${
                      currentUser?.email
                    }%0D%0ANumer telefonu: ${
                      currentUser?.phone
                    }%0D%0ARodzaj usługi: ${
                      filters?.serviceType === "accom"
                        ? "Nocleg"
                        : filters?.serviceType === "walk"
                        ? "Spacer"
                        : filters?.serviceType === "homeVisit"
                        ? "Wizyta domowa"
                        : "Nie wybrano"
                    }%0D%0ALokalizacja usługi: ${
                      filters?.city.charAt(0).toUpperCase() +
                      filters?.city.substring(1)
                    }%0D%0ATermin od ${filters?.startDate} do ${
                      filters?.endDate
                    }
                  
                  %0D%0A%0D%0ADane zwierzaka:%0D%0AImię: ${
                    filters?.petName
                  }%0D%0APłeć: ${
                      filters?.petSex === "male" ? "Samiec" : "Samica"
                    }%0D%0ARasa: ${
                      filters?.petRace === "dog" ? "Pies" : "Kot"
                    }%0D%0AZachowanie: ${
                      filters?.petBehavior === "averageBehavior"
                        ? "Średniak"
                        : filters?.petBehavior === "lazyBehavior"
                        ? "Leniuch"
                        : filters?.petBehavior === "crazyBehavior"
                        ? "Wariat"
                        : "Nie wybrano"
                    }%0D%0AOpis: ${
                      filters?.petDescription
                        ? filters?.petDescription
                        : "Nie podano opisu"
                    }`}
                  >
                    Zapytaj o dostępność
                  </a>
                </button>
              ) : (
                ""
              )}
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
};
export default PetsitterBar;
