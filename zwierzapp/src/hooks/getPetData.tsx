import { useEffect, useState } from "react";
import useFirebaseData from "./useFirebaseData";

export interface PetsDocuments {
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

const getPetData = (user: string) => {
  const currentUserId = user;
  const pets: PetsDocuments[] = useFirebaseData("Pets");
  const [petDocuments, setPetDocuments] = useState<PetsDocuments[]>([]);

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
