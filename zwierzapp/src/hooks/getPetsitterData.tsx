import { useEffect, useState } from "react";
import useFirebaseData from "./useFirebaseData";
import useAuth, { User } from "../context/AuthContext";

export interface PetsitterDocument {
  userId: string;
  prices?: {
    [key: number]: {
      dogHomeVisitPrice?: number;
      dogAccomPrice?: number;
      dogWalkPrice?: number;
      catHomeVisitPrice?: number;
      catAccomPrice?: number;
      catWalkPrice?: number;
    };
  };
  animals?: {
    [key: number]: {
      dog?: boolean;
      dogAccom?: boolean;
      dogHomeVisit?: boolean;
      dogWalk?: boolean;
      cat?: boolean;
      catAccom?: boolean;
      catHomeVisit?: boolean;
      catWalk?: boolean;
    };
  };
}

const getPetsitterData = (): PetsitterDocument | null => {
  const { currentUser }: { currentUser: User | null } = useAuth() || {
    currentUser: null,
  };
  const petsitters: PetsitterDocument[] = useFirebaseData("Petsitters");
  const [petsitterDocument, setPetsitterDocument] =
    useState<PetsitterDocument | null>(null);

  useEffect(() => {
    if (currentUser && petsitters.length > 0) {
      const foundPetsitterDocument = petsitters.find(
        (user) => user.userId === currentUser.uid // example uid - "a1gQemvPIzf2ccO862fXmUQWToA3"
      );
      setPetsitterDocument(foundPetsitterDocument || null);
    }
  }, [currentUser, petsitters]);
  return petsitterDocument;
};

export default getPetsitterData;
