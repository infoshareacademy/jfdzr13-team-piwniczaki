import { useState } from "react";
import { PetsitterDocument } from "./getPetsitterData";
import useSubcollectionData from "./useSubcollectionData";
import useSearchbarFilters from "./useSearchbarFilters";
import usePetData from "./usePetData";
import useFirebaseData from "./useFirebaseData";
import useFilter from "./useFilter";
import useSort from "./useSort";

const useFindPetsitters = (sortParam: object): [PetsitterDocument[]] => {
  //tworzenie obiektu filters
  const searchObj = useSearchbarFilters();
  const petObj = usePetData(searchObj.petId);
  const filters = { ...searchObj, ...petObj };

  //tworzenie listy petsitterow
  const [petsitters, setPetsitters] = useState([]);
  const petsittersDb = useFirebaseData("Petsitters");
  setPetsitters(petsittersDb);

  //dodanie do kazdego petsittera odpowiadajacej subkolekcji access
  const petsitter; //element potrzebny do otrzymania ID
  const accessObj = useSubcollectionData("Petsitters", "access", petsitter.id);

  // const filteredPetsitters = useFilter(petsitters, filters);
  // const sortedPetsitters = useSort(sortParam, filteredPetsitters, filters);

  return ["somenthing"];
};

export default useFindPetsitters;
