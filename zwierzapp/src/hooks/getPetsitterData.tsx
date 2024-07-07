import { useEffect, useState } from "react";
import useFirebaseData from "./useFirebaseData";
import useAuth, { User } from "../context/AuthContext";

export interface PetsitterDocument {
  userId: string;
  id?: string;
  prices?: {
    dogHomeVisitPrice?: number;
    dogAccomPrice?: number;
    dogWalkPrice?: number;
    catHomeVisitPrice?: number;
    catAccomPrice?: number;
    catWalkPrice?: number;
  };
  checkboxes?: {
    catActivity2: boolean;
    catWeight5: boolean;
    catWeight4: boolean;
    catWeight3: boolean;
    catWeight2: boolean;
    catWeight1: boolean;
    catWeight0: boolean;
    catActivity1: boolean;
    catActivity0: boolean;
    dogActivity0: boolean;
    dogActivity1: boolean;
    dogActivity2: boolean;
    dogWeight5: boolean;
    dogWeight4: boolean;
    dogWeight3: boolean;
    dogWeight1: boolean;
    dogWeight0: boolean;
    dogWeight2: boolean;
    dog?: boolean;
    dogAccom?: boolean;
    dogHomeVisit?: boolean;
    dogWalk?: boolean;
    cat?: boolean;
    catAccom?: boolean;
    catHomeVisit?: boolean;
    catWalk?: boolean;
  };
  userData?:{
    city?: string;
    id?: string;
    name?: string;
    phone?: string;
    surname?: string;
    uid?: string;
    avatar?:{
      alt?:string;
      id?:number;
      photo?:string;
    };
    shortDescription?:string;
  }

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
