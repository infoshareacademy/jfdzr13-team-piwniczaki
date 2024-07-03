import styles from './PetsitterBar.module.scss'
import findPetsitter from "../../../hooks/findPetsitter";
import getSinglePetData, { PetDocument } from '../../../hooks/getSinglePetData';
import { useParams } from 'react-router';
//wersja mocno wstępna
const PetsitterBar = () => {
  const petsittersArr = findPetsitter();
  const {serviceType, petId} = useParams<{ serviceType: string; petId: string }>();
  const petData: PetDocument | undefined = getSinglePetData(petId);

  const getPriceForService = (petsitter: any) => {
    if (!petData) return 0;

    switch (serviceType) {
      case "walk":
        return petsitter.race === "dog" ? petsitter.dogWalkPrice || 0 : petsitter.catWalkPrice || 0;
      case "accom":
        return petsitter.race === "dog" ? petsitter.dogAccomPrice || 0 : petsitter.catAccomPrice || 0;
      case "homeVisit":
        return petsitter.race === "dog" ? petsitter.dogHomeVisitPrice || 0 : petsitter.catHomeVisitPrice || 0;
      default:
        return 0;
    }
  };

  return (
    <div>
      {petsittersArr && petsittersArr.map((petsitter)=>(    
        <div key={petsitter.userId}>
          <img/>
          <div>
            <h1>{petsitter.name} {petsitter.surname} </h1>
            <p>{petsitter.shortDescription}</p>
          </div>
          <div>
            <span>suma {getPriceForService(petsitter)}zł</span>
            <button>Wyślij zapytanie</button>
          </div>
        </div>
      ))} 
      {!petsittersArr && 
      <div>
        <h1>Nie znaleziono opiekunów :/</h1>
      </div>
      }
    </div>

  )
}

export default PetsitterBar
