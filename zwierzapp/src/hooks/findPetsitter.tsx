import { useEffect, useState } from "react";
import getSinglePetData, { PetDocument } from "./getSinglePetData";

interface Filters {
  petID: string | null;
  petAge: string | null;
  petBehavior: string | null;
  petDescription: string | null;
  petName: string | null;
  petRace: string | null;
  petSex: string | null;
  petWeight: string | null;
  minValue: string | null;
  maxValue: string | null;
  startDate: string | null;
  endDate: string | null;
  city: string | null;
  serviceType: string | null;
}

const findPetsitter = () => {
  const queryParameters = new URLSearchParams(window.location.search);

  const petID = queryParameters.get("petName");
  const petObject: PetDocument | undefined = getSinglePetData(petID);

  const minValue = queryParameters.get("minValue") || null;
  const maxValue = queryParameters.get("maxValue") || null;
  const startDate = queryParameters.get("startDate") || null;
  const endDate = queryParameters.get("endDate") || null;
  const city = queryParameters.get("city") || null;
  const serviceType = queryParameters.get("serviceType");

  const [filters, setFilters] = useState<Filters>({
    petID: petID,
    petAge: null,
    petBehavior: null,
    petDescription: null,
    petName: null,
    petRace: null,
    petSex: null,
    petWeight: null,
    minValue: minValue,
    maxValue: maxValue,
    startDate: startDate,
    endDate: endDate,
    city: city,
    serviceType: serviceType,
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      petAge: petObject?.age || null,
      petBehavior: petObject?.behavior || null,
      petDescription: petObject?.description || null,
      petName: petObject?.name || null,
      petRace: petObject?.race || null,
      petSex: petObject?.sex || null,
      petWeight: petObject?.weight || null,
    }));
  }, []); //tutaj w tablicy ma być queryParams, ale nie dodaję bo wpada w loopa
  // Uwagaaaaaaaaaa, bo jak dopiszecie to zablokuje firebase, więc dlatestu dopisać zeby zaktualizowalo i od razu usunac

  const filterPetSitters = () => {
    return filters;
  };

  return filterPetSitters();
};

export default findPetsitter;
