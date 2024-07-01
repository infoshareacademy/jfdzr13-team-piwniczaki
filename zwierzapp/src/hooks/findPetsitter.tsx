import { useEffect, useState } from "react";
import getSinglePetData, { PetDocument } from "./getSinglePetData";
import { useLocation } from "react-router";

interface Filters {
  petId: string | null;
  petAge: string | null;
  petBehavior: string | null;
  petDescription: string | null;
  petName: string | null;
  petRace: string | null;
  petSex: string | null;
  petWeight: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  startDate: string | null;
  endDate: string | null;
  city: string | null;
  serviceType: string | null;
}

const findPetsitter = () => {
  const location = useLocation();
  const [queryParameters, setQueryParameters] = useState(
    new URLSearchParams(window.location.search)
  );

  // const petObject: PetDocument | undefined = getSinglePetData(petID);
  const [petObject, setPetObject] = useState<PetDocument | undefined>();
  const [petID, setPetID] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [city, setCity] = useState(null);
  const [serviceType, setServiceType] = useState(null);

  const [filters, setFilters] = useState<Filters>({
    petId: petID,
    petAge: null,
    petBehavior: null,
    petDescription: null,
    petName: null,
    petRace: null,
    petSex: null,
    petWeight: null,
    minPrice: minPrice,
    maxPrice: maxPrice,
    startDate: startDate,
    endDate: endDate,
    city: city,
    serviceType: serviceType,
  });

  useEffect(() => {
    setPetObject(getSinglePetData());
    setQueryParameters(new URLSearchParams(window.location.search));
    setPetID(queryParameters.get("petId"));
    setMinPrice(queryParameters.get("minPrice") || null);
    setMaxPrice(queryParameters.get("maxPrice") || null);
    setStartDate(queryParameters.get("startDate") || null);
    setEndDate(queryParameters.get("endDate") || null);
    setCity(queryParameters.get("city") || null);
    setServiceType(queryParameters.get("serviceType"));
    setFilters(() => ({
      minPrice: minPrice,
      maxPrice: maxPrice,
      startDate: startDate,
      endDate: endDate,
      city: city,
      serviceType: serviceType,
      petID: petObject?.id || null,
      petAge: petObject?.age || null,
      petBehavior: petObject?.behavior || null,
      petDescription: petObject?.description || null,
      petName: petObject?.name || null,
      petRace: petObject?.race || null,
      petSex: petObject?.sex || null,
      petWeight: petObject?.weight || null,
    }));
  }, [location, getSinglePetData]);

  const filterPetSitters = () => {
    return filters;
  };

  return filterPetSitters();
};

export default findPetsitter;
