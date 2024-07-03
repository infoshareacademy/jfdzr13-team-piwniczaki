import { useEffect, useState } from "react";
import findPetsittersByRace, { Filters } from "./findPetsittersByRace";
import { PetsitterDocument } from "./getPetsitterData";
import useFirebaseData from "./useFirebaseData";
import useSubcollectionData from "./useSubcollectionData";

interface ExtendedFilters extends Filters {
  experienceLevel?: string;
  availability?: string;
  priceRange?: [number, number];
}

const useFindPetsitters = (): [ExtendedFilters, PetsitterDocument[]] => {
  const [filters, petsitterIds] = findPetsittersByRace() as [
    ExtendedFilters,
    string[]
  ];
  const [petsitters, setPetsitters] = useState<PetsitterDocument[]>([]);
  const [filteredPetsitters, setFilteredPetsitters] = useState<string[]>([]);

  const petsittersData: PetsitterDocument[] = useFirebaseData("Petsitters");

  useEffect(() => {
    const fetchAccessData = async () => {
      const filteredPetsitters = petsittersData.filter((user) =>
        petsitterIds.includes(user.userId)
      );

      const petsittersWithAccessData = await Promise.all(
        filteredPetsitters.map(async (petsitter) => {
          try {
            const accessData = await useSubcollectionData(
              "Petsitters",
              "access",
              petsitter.id
            );
            return { ...petsitter, access: accessData };
          } catch (error) {
            console.error(`Error fetching access data ${petsitter.id}`, error);
            return { ...petsitter, access: [] };
          }
        })
      );

      setPetsitters(petsittersWithAccessData);
    };

    fetchAccessData();
  }, [petsitterIds, petsittersData]);

  useEffect(() => {
    if (petsitters) {
      let filteredPetsitters = petsitters;
      //Sortowanie po mieście
      if (filters.city) {
        filteredPetsitters = filteredPetsitters.filter((el) =>
          el.access.some(
            (accessItem) =>
              accessItem.careCity.toLowerCase() === filters?.city?.toLowerCase()
          )
        );
      }
      //Sortowanie jezeli pies
      if (filters.petRace === "dog") {
        //sortowanie po rodzaju uslugi
        if (filters.serviceType) {
          if (filters.serviceType === "walk") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogWalk === true
            );
          }
          if (filters.serviceType === "accom") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogAccom === true
            );
          }
          if (filters.serviceType === "homeVisit") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogHomeVisit === true
            );
          }
        }
        //sortowanie po wadze
        if (filters.petWeight) {
          if (filters.petWeight === "weight0") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogWeight0 === true
            );
          }
          if (filters.petWeight === "weight1") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogWeight1 === true
            );
          }
          if (filters.petWeight === "weight2") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogWeight2 === true
            );
          }
          if (filters.petWeight === "weight3") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogWeight3 === true
            );
          }
          if (filters.petWeight === "weight4") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogWeight4 === true
            );
          }
          if (filters.petWeight === "weight5") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogWeight5 === true
            );
          }
        }
        //sortowanie po aktywności
        if (filters.petBehavior) {
          if (filters.petBehavior === "lazyBehavior") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogActivity0 === true
            );
          }
          if (filters.petBehavior === "averageBehavior") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogActivity1 === true
            );
          }
          if (filters.petBehavior === "crazyBehavior") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogActivity2 === true
            );
          }
        }
        //sortowanie po plci
        // if (filters.petSex) {
        //   if (filters.petSex === "male") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.dogSex0 === true
        //     );
        //   }
        //   if (filters.petSex === "female") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.dogSex1 === true
        //     );
        //   }
        // }
        //sortowanie po wieku
        // if (filters.petAge) {
        //   if (filters.petAge === "young") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.dogAge0 === true
        //     );
        //   }
        //   if (filters.petAge === "adult") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.dogAge1 === true
        //     );
        //   }
        //   if (filters.petAge === "old") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.dogAge2 === true
        //     );
        //   }
        // }
      }
      //Sortowanie jezeli kot
      if (filters.petRace === "cat") {
        //sortowanie po rodzaju uslugi
        if (filters.serviceType) {
          if (filters.serviceType === "walk") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catWalk === true
            );
          }
          if (filters.serviceType === "accom") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catAccom === true
            );
          }
          if (filters.serviceType === "homeVisit") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catHomeVisit === true
            );
          }
        }
        //sortowanie po wadze
        if (filters.petWeight) {
          if (filters.petWeight === "weight0") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catWeight0 === true
            );
          }
          if (filters.petWeight === "weight1") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catWeight1 === true
            );
          }
          if (filters.petWeight === "weight2") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catWeight2 === true
            );
          }
          if (filters.petWeight === "weight3") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catWeight3 === true
            );
          }
          if (filters.petWeight === "weight4") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catWeight4 === true
            );
          }
          if (filters.petWeight === "weight5") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catWeight5 === true
            );
          }
        }
        //sortowanie po aktywności
        if (filters.petBehavior) {
          if (filters.petBehavior === "lazyBehavior") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catActivity0 === true
            );
          }
          if (filters.petBehavior === "averageBehavior") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catActivity1 === true
            );
          }
          if (filters.petBehavior === "crazyBehavior") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catActivity2 === true
            );
          }
        }
        //sortowanie po plci
        // if (filters.petSex) {
        //   if (filters.petSex === "male") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.catSex0 === true
        //     );
        //   }
        //   if (filters.petSex === "female") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.catSex1 === true
        //     );
        //   }
        // }
        //sortowanie po wieku
        // if (filters.petAge) {
        //   if (filters.petAge === "young") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.catAge0 === true
        //     );
        //   }
        //   if (filters.petAge === "adult") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.catAge1 === true
        //     );
        //   }
        //   if (filters.petAge === "old") {
        //     filteredPetsitters = filteredPetsitters.filter(
        //       (el) => el.checkboxes?.catAge2 === true
        //     );
        //   }
        // }
      }
      setFilteredPetsitters(filteredPetsitters);
    }
  }, [filters, petsitters]);

  // console.log("Obiekty petsitterów z serwera:", petsitters);
  // console.log("Przefiltrowane obiekty petsitterów:", filteredPetsitters);
  // console.log("Filtry: ", filters);

  return [filters, filteredPetsitters];
};

export default useFindPetsitters;
