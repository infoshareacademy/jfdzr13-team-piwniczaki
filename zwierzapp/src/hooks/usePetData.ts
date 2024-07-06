import { useEffect, useState } from "react";
import useFirebaseData from "./useFirebaseData";
import { PetsDocuments } from "./getPetData";
import { Filters } from "./useSearchbarFilters";

const usePetData = (id: Filters) => {
  const pets: PetsDocuments[] = useFirebaseData("Pets");
  const [petDocument, setPetDocument] = useState<PetsDocuments[]>([]);

  useEffect(() => {
    if (id && pets.length > 0) {
      const foundPetDocuments = pets.filter((pet) => pet.id === id);
      setPetDocument(foundPetDocuments);
    }
  }, [id, pets]);

  return petDocument[0];
};

export default usePetData;
