import { useEffect, useState } from "react";
import useFirebaseData from "./useFirebaseData";

export interface PetDocument {
  userID?: string;
  age?: string;
  behavior?: string;
  description?: string;
  name?: string;
  race?: string;
  sex?: string;
  weight?: string;
  id?: string;
}

const getSinglePetData = (petID: string | null): PetDocument | undefined => {
  const pets: PetDocument[] = useFirebaseData("Pets");
  const [petDocument, setPetDocument] = useState<PetDocument | undefined>(
    undefined
  );

  useEffect(() => {
    if (petID && pets.length > 0) {
      const foundPetDocument = pets.find((pet) => pet.id === petID);
      setPetDocument(foundPetDocument);
    }
  }, [petID, pets]);

  return petDocument;
};

export default getSinglePetData;
