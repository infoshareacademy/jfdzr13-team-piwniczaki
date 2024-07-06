import { useEffect, useState } from "react";
import { PetsitterDocument } from "./getPetsitterData";
import useSubcollectionData from "./useSubcollectionData";
import findPetsittersByRace, { Filters } from "./findPetsittersByRace";
import usePetsittersData from "./usePetsittersData";
import useUsersData from "./useUsersData";

interface ExtendedFilters extends Filters {
  experienceLevel?: string;
  availability?: string;
  priceRange?: [number, number];
}

const useFindPetsitters = (
  sortParam: object
): [ExtendedFilters, PetsitterDocument[]] => {
  const [filters, petsitterIds] = findPetsittersByRace() as [
    ExtendedFilters,
    string[]
  ];
  const [petsitters, setPetsitters] = useState<PetsitterDocument[]>([]);
  const [filteredPetsitters, setFilteredPetsitters] = useState<string[]>([]);


  useEffect(() => {
    const fetchAccessData = async () => {
      
      try {
        const petsittersData = await usePetsittersData();

        // Filter the petsitters based on the given IDs
        const filteredPetsitters = petsittersData.filter((petsitter) =>
          petsitterIds.includes(petsitter.userId)
        );

        // Fetch access data for each petsitter
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
              console.error(
                `Error fetching access data for ${petsitter.id}`,
                error
              );
              return { ...petsitter, access: [] };
            }
          })
        );

        // Fetch user data for each petsitter with access data
        const petsittersWithUsersData = await Promise.all(
          petsittersWithAccessData.map(async (petsitter) => {
            try {
              const usersData = await useUsersData();
              const userData = usersData.find(
                (user) => user.uid === petsitter.userId
              );
              return { ...petsitter, userData: userData };
            } catch (error) {
              console.error(
                `Error fetching user data for ${petsitter.id}`,
                error
              );
              return { ...petsitter, userData: {} };
            }
          })
        );

        // Update the state with the final combined data
        setPetsitters(petsittersWithUsersData);
      } catch (error) {
        console.error("Error fetching petsitters data", error);
      }
    };

    fetchAccessData();
  }, [petsitterIds, filters]);

  useEffect(() => {
    if (petsitters) {
      let filteredPetsitters = petsitters;
      //Sortowanie po mieście
      if (filters.city) {
        filteredPetsitters = filteredPetsitters.filter((el) =>
          el.access?.some(
            (accessItem) =>
              accessItem.careCity.toLowerCase() === filters?.city?.toLowerCase()
          )
        );
      }
      //Sortowanie po dacie od
      if (filters.startDate) {
        const startDate = new Date(filters.startDate); // Convert filters.startDate to a Date object
        filteredPetsitters = filteredPetsitters.filter((el) =>
          el.access?.some(
            (accessItem) => new Date(accessItem.startDate) <= startDate // Convert accessItem.startDate to a Date object for comparison
          )
        );
      }
      //Sortowanie po dacie do
      if (filters.endDate) {
        const endDate = new Date(filters.endDate); // Convert filters.startDate to a Date object
        filteredPetsitters = filteredPetsitters.filter((el) =>
          el.access?.some(
            (accessItem) => new Date(accessItem.endDate) >= endDate // Convert accessItem.startDate to a Date object for comparison
          )
        );
      }
      if (filters.petRace === "dog") {
        if (filters.serviceType) {
          if (filters.serviceType === "walk") {
            if (filters.minPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.dogWalkPrice >= filters.minPrice
              );
            }
          }
          if (filters.serviceType === "accom") {
            if (filters.minPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.dogAccomPrice >= filters.minPrice
              );
            }
          }
          if (filters.serviceType === "homeVisit") {
            if (filters.minPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.dogHomeVisitPrice >= filters.minPrice
              );
            }
          }
          if (filters.serviceType === "walk") {
            if (filters.maxPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.dogWalkPrice <= filters.maxPrice
              );
            }
          }
          if (filters.serviceType === "accom") {
            if (filters.maxPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.dogAccomPrice <= filters.maxPrice
              );
            }
          }
          if (filters.serviceType === "homeVisit") {
            if (filters.maxPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.dogHomeVisitPrice <= filters.maxPrice
              );
            }
          }
        }
      }
      if (filters.petRace === "cat") {
        if (filters.serviceType) {
          if (filters.serviceType === "walk") {
            if (filters.minPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.catWalkPrice >= filters.minPrice
              );
            }
          }
          if (filters.serviceType === "accom") {
            if (filters.minPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.catAccomPrice >= filters.minPrice
              );
            }
          }
          if (filters.serviceType === "homeVisit") {
            if (filters.minPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.catHomeVisitPrice >= filters.minPrice
              );
            }
          }
          if (filters.serviceType === "walk") {
            if (filters.maxPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.catWalkPrice <= filters.maxPrice
              );
            }
          }
          if (filters.serviceType === "accom") {
            if (filters.maxPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.catAccomPrice <= filters.maxPrice
              );
            }
          }
          if (filters.serviceType === "homeVisit") {
            if (filters.maxPrice) {
              filteredPetsitters = filteredPetsitters.filter(
                (el) => el.prices?.catHomeVisitPrice <= filters.maxPrice
              );
            }
          }
        }
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
        if (filters.petSex) {
          if (filters.petSex === "male") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogSex0 === true
            );
          }
          if (filters.petSex === "female") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogSex1 === true
            );
          }
        }
        //sortowanie po wieku
        if (filters.petAge) {
          if (filters.petAge === "young") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogAge0 === true
            );
          }
          if (filters.petAge === "adult") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogAge1 === true
            );
          }
          if (filters.petAge === "old") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.dogAge2 === true
            );
          }
        }
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
        if (filters.petSex) {
          if (filters.petSex === "male") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catSex0 === true
            );
          }
          if (filters.petSex === "female") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catSex1 === true
            );
          }
        }
        // sortowanie po wieku
        if (filters.petAge) {
          if (filters.petAge === "young") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catAge0 === true
            );
          }
          if (filters.petAge === "adult") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catAge1 === true
            );
          }
          if (filters.petAge === "old") {
            filteredPetsitters = filteredPetsitters.filter(
              (el) => el.checkboxes?.catAge2 === true
            );
          }
        }
      }
      setFilteredPetsitters(filteredPetsitters);
    }
  }, [filters, petsitters]);

  //zaczynamy sortowanie

  const [sortedPetsitters, setSortedPetsitters] = useState([]);
  const [sortParamState, setSortParamState] = useState({});

  useEffect(() => {
    if (sortParam.byName) {
      if (sortParam.asc) {
        setSortParamState("byNameAsc");
      }
      if (sortParam.desc) {
        setSortParamState("byNameDesc");
      }
    }
    if (sortParam.byPrice) {
      if (sortParam.asc) {
        setSortParamState("byPriceAsc");
      }
      if (sortParam.desc) {
        setSortParamState("byPriceDesc");
      }
    }
  }, [sortParam]);

  useEffect(() => {
    if (sortParamState === "byNameAsc") {
      const sortedData = [...filteredPetsitters].sort((a, b) => {
        const nameA = a.userData?.name ?? "";
        const nameB = b.userData?.name ?? "";
        const surnameA = a.userData?.surname ?? "";
        const surnameB = b.userData?.surname ?? "";

        const surnameComparison = surnameA.localeCompare(surnameB);
        if (surnameComparison !== 0) {
          return surnameComparison;
        }
        return nameA.localeCompare(nameB);
      });
      setSortedPetsitters(sortedData);
    }
    if (sortParamState === "byNameDesc") {
      const sortedData = [...filteredPetsitters].sort((a, b) => {
        const nameA = a.userData?.name ?? "";
        const nameB = b.userData?.name ?? "";
        const surnameA = a.userData?.surname ?? "";
        const surnameB = b.userData?.surname ?? "";

        const surnameComparison = surnameA.localeCompare(surnameB);
        if (surnameComparison !== 0) {
          return -surnameComparison;
        }
        return -nameA.localeCompare(nameB);
      });
      setSortedPetsitters(sortedData);
    }
    if (filters.petRace === "dog") {
      if (filters.serviceType === "walk") {
        if (sortParamState === "byPriceAsc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.dogWalkPrice ?? 0;
            const priceB = b.prices?.dogWalkPrice ?? 0;

            return priceA - priceB;
          });
          setSortedPetsitters(sortedData);
        }

        if (sortParamState === "byPriceDesc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.dogWalkPrice ?? 0;
            const priceB = b.prices?.dogWalkPrice ?? 0;

            return priceB - priceA;
          });
          setSortedPetsitters(sortedData);
        }
      }
      if (filters.serviceType === "accom") {
        if (sortParamState === "byPriceAsc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.dogAccomPrice ?? 0;
            const priceB = b.prices?.dogAccomPrice ?? 0;

            return priceA - priceB;
          });
          setSortedPetsitters(sortedData);
        }

        if (sortParamState === "byPriceDesc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.dogAccomPrice ?? 0;
            const priceB = b.prices?.dogAccomPrice ?? 0;

            return priceB - priceA;
          });
          setSortedPetsitters(sortedData);
        }
      }
      if (filters.serviceType === "homeVisit") {
        if (sortParamState === "byPriceAsc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.dogHomeVisitPrice ?? 0;
            const priceB = b.prices?.dogHomeVisitPrice ?? 0;

            return priceA - priceB;
          });
          setSortedPetsitters(sortedData);
        }

        if (sortParamState === "byPriceDesc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.dogHomeVisitPrice ?? 0;
            const priceB = b.prices?.dogHomeVisitPrice ?? 0;

            return priceB - priceA;
          });
          setSortedPetsitters(sortedData);
        }
      }
    }
    if (filters.petRace === "cat") {
      if (filters.serviceType === "walk") {
        if (sortParamState === "byPriceAsc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.catWalkPrice ?? 0;
            const priceB = b.prices?.catWalkPrice ?? 0;

            return priceA - priceB;
          });
          setSortedPetsitters(sortedData);
        }

        if (sortParamState === "byPriceDesc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.catWalkPrice ?? 0;
            const priceB = b.prices?.catWalkPrice ?? 0;

            return priceB - priceA;
          });
          setSortedPetsitters(sortedData);
        }
      }
      if (filters.serviceType === "accom") {
        if (sortParamState === "byPriceAsc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.catAccomPrice ?? 0;
            const priceB = b.prices?.catAccomPrice ?? 0;

            return priceA - priceB;
          });
          setSortedPetsitters(sortedData);
        }

        if (sortParamState === "byPriceDesc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.catAccomPrice ?? 0;
            const priceB = b.prices?.catAccomPrice ?? 0;

            return priceB - priceA;
          });
          setSortedPetsitters(sortedData);
        }
      }
      if (filters.serviceType === "homeVisit") {
        if (sortParamState === "byPriceAsc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.catHomeVisitPrice ?? 0;
            const priceB = b.prices?.catHomeVisitPrice ?? 0;

            return priceA - priceB;
          });
          setSortedPetsitters(sortedData);
        }

        if (sortParamState === "byPriceDesc") {
          const sortedData = [...filteredPetsitters].sort((a, b) => {
            const priceA = a.prices?.catHomeVisitPrice ?? 0;
            const priceB = b.prices?.catHomeVisitPrice ?? 0;

            return priceB - priceA;
          });
          setSortedPetsitters(sortedData);
        }
      }
    }
  }, [filteredPetsitters, sortParamState]);

  return [filters, sortedPetsitters];
};

export default useFindPetsitters;
