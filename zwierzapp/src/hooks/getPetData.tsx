import { useEffect, useState } from "react";
import useFirebaseData from "./useFirebaseData";

export interface PetDocument {
  userID: string;
  age?: string;
  behavior?: string;
  description?: string;
  name: string;
  race: string;
  sex: string;
  weight: string;
}

const getPetData = (user: string): PetDocument | null => {
  const currentUserId = user;
  const pets: PetDocument[] = useFirebaseData("Pets");
  const [petDocument, setPetsitterDocument] = useState<PetDocument | null>(
    null
  );

  useEffect(() => {
    if (currentUserId && pets.length > 0) {
      const foundPetDocument = pets.find((pet) => pet.userID === currentUserId);
      setPetsitterDocument(foundPetDocument || null);
    }
  }, [currentUserId, pets]);
  return petDocument;
};

export default getPetData;
