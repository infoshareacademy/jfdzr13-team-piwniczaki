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

const getPetData = (user: string): PetDocument[] => {
  const currentUserId = user;
  const pets: PetDocument[] = useFirebaseData("Pets");
  const [petDocuments, setPetDocuments] = useState<PetDocument[]>([]);

  useEffect(() => {
    if (currentUserId && pets.length > 0) {
      const foundPetDocuments = pets.filter(
        (pet) => pet.userID === currentUserId
      );
      setPetDocuments(foundPetDocuments);
    }
  }, [currentUserId, pets]);

  return petDocuments;
};

export default getPetData;
