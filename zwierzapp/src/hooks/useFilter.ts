import { useState, useEffect } from "react";

const useFilter = (petsitters, filters) => {
  const [filteredPetsitters, setFilteredPetsitters] = useState([]);

  useEffect(() => {
    if (petsitters) {
      let result = [...petsitters];

      const applyFilter = (condition) => {
        result = result.filter(condition);
      };

      if (filters.city) {
        applyFilter((el) =>
          el.access?.some(
            (accessItem) =>
              accessItem.careCity.toLowerCase() === filters.city.toLowerCase()
          )
        );
      }

      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        applyFilter((el) =>
          el.access?.some(
            (accessItem) => new Date(accessItem.startDate) <= startDate
          )
        );
      }

      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        applyFilter((el) =>
          el.access?.some(
            (accessItem) => new Date(accessItem.endDate) >= endDate
          )
        );
      }

      const filterByPrice = (minPrice, maxPrice, priceType) => {
        if (minPrice) {
          applyFilter((el) => el.prices?.[priceType] >= minPrice);
        }
        if (maxPrice) {
          applyFilter((el) => el.prices?.[priceType] <= maxPrice);
        }
      };

      if (filters.serviceType) {
        const serviceType = filters.serviceType;
        const petType = filters.petRace;
        const minPrice = filters.minPrice;
        const maxPrice = filters.maxPrice;

        if (petType === "dog") {
          filterByPrice(
            minPrice,
            maxPrice,
            `dog${capitalizeFirstLetter(serviceType)}Price`
          );
          applyFilter(
            (el) => el.checkboxes?.[`dog${capitalizeFirstLetter(serviceType)}`]
          );
        }

        if (petType === "cat") {
          filterByPrice(
            minPrice,
            maxPrice,
            `cat${capitalizeFirstLetter(serviceType)}Price`
          );
          applyFilter(
            (el) => el.checkboxes?.[`cat${capitalizeFirstLetter(serviceType)}`]
          );
        }
      }

      const filterByCheckbox = (checkboxPrefix, filterValue, options) => {
        if (filterValue) {
          applyFilter(
            (el) => el.checkboxes?.[`${checkboxPrefix}${options[filterValue]}`]
          );
        }
      };

      if (filters.petRace === "dog") {
        filterByCheckbox("dogWeight", filters.petWeight, weightOptions);
        filterByCheckbox("dogActivity", filters.petBehavior, behaviorOptions);
        filterByCheckbox("dogSex", filters.petSex, sexOptions);
        filterByCheckbox("dogAge", filters.petAge, ageOptions);
      }

      if (filters.petRace === "cat") {
        filterByCheckbox("catWeight", filters.petWeight, weightOptions);
        filterByCheckbox("catActivity", filters.petBehavior, behaviorOptions);
        filterByCheckbox("catSex", filters.petSex, sexOptions);
        filterByCheckbox("catAge", filters.petAge, ageOptions);
      }

      setFilteredPetsitters(result);
    }
  }, [petsitters, filters]);

  return filteredPetsitters;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const weightOptions = {
  weight0: "0",
  weight1: "1",
  weight2: "2",
  weight3: "3",
  weight4: "4",
  weight5: "5",
};

const behaviorOptions = {
  lazyBehavior: "0",
  averageBehavior: "1",
  crazyBehavior: "2",
};

const sexOptions = {
  male: "0",
  female: "1",
};

const ageOptions = {
  young: "0",
  adult: "1",
  old: "2",
};

export default useFilter;

// import { useState } from "react";

// const useFilter = (petsitters, filters) => {
//   const [filteredPetsitters, setFilteredPetsitters] = useState<string[]>([]);
//   if (petsitters) {
//     let filteredPetsitters = petsitters;
//     //Sortowanie po mieście
//     if (filters.city) {
//       filteredPetsitters = filteredPetsitters.filter((el) =>
//         el.access?.some(
//           (accessItem) =>
//             accessItem.careCity.toLowerCase() === filters?.city?.toLowerCase()
//         )
//       );
//     }
//     //Sortowanie po dacie od
//     if (filters.startDate) {
//       const startDate = new Date(filters.startDate); // Convert filters.startDate to a Date object
//       filteredPetsitters = filteredPetsitters.filter((el) =>
//         el.access?.some(
//           (accessItem) => new Date(accessItem.startDate) <= startDate // Convert accessItem.startDate to a Date object for comparison
//         )
//       );
//     }
//     //Sortowanie po dacie do
//     if (filters.endDate) {
//       const endDate = new Date(filters.endDate); // Convert filters.startDate to a Date object
//       filteredPetsitters = filteredPetsitters.filter((el) =>
//         el.access?.some(
//           (accessItem) => new Date(accessItem.endDate) >= endDate // Convert accessItem.startDate to a Date object for comparison
//         )
//       );
//     }
//     if (filters.petRace === "dog") {
//       if (filters.serviceType) {
//         if (filters.serviceType === "walk") {
//           if (filters.minPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.dogWalkPrice >= filters.minPrice
//             );
//           }
//         }
//         if (filters.serviceType === "accom") {
//           if (filters.minPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.dogAccomPrice >= filters.minPrice
//             );
//           }
//         }
//         if (filters.serviceType === "homeVisit") {
//           if (filters.minPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.dogHomeVisitPrice >= filters.minPrice
//             );
//           }
//         }
//         if (filters.serviceType === "walk") {
//           if (filters.maxPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.dogWalkPrice <= filters.maxPrice
//             );
//           }
//         }
//         if (filters.serviceType === "accom") {
//           if (filters.maxPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.dogAccomPrice <= filters.maxPrice
//             );
//           }
//         }
//         if (filters.serviceType === "homeVisit") {
//           if (filters.maxPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.dogHomeVisitPrice <= filters.maxPrice
//             );
//           }
//         }
//       }
//     }
//     if (filters.petRace === "cat") {
//       if (filters.serviceType) {
//         if (filters.serviceType === "walk") {
//           if (filters.minPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.catWalkPrice >= filters.minPrice
//             );
//           }
//         }
//         if (filters.serviceType === "accom") {
//           if (filters.minPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.catAccomPrice >= filters.minPrice
//             );
//           }
//         }
//         if (filters.serviceType === "homeVisit") {
//           if (filters.minPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.catHomeVisitPrice >= filters.minPrice
//             );
//           }
//         }
//         if (filters.serviceType === "walk") {
//           if (filters.maxPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.catWalkPrice <= filters.maxPrice
//             );
//           }
//         }
//         if (filters.serviceType === "accom") {
//           if (filters.maxPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.catAccomPrice <= filters.maxPrice
//             );
//           }
//         }
//         if (filters.serviceType === "homeVisit") {
//           if (filters.maxPrice) {
//             filteredPetsitters = filteredPetsitters.filter(
//               (el) => el.prices?.catHomeVisitPrice <= filters.maxPrice
//             );
//           }
//         }
//       }
//     }

//     //Sortowanie jezeli pies
//     if (filters.petRace === "dog") {
//       //sortowanie po rodzaju uslugi
//       if (filters.serviceType) {
//         if (filters.serviceType === "walk") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogWalk === true
//           );
//         }
//         if (filters.serviceType === "accom") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogAccom === true
//           );
//         }
//         if (filters.serviceType === "homeVisit") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogHomeVisit === true
//           );
//         }
//       }
//       //sortowanie po wadze
//       if (filters.petWeight) {
//         if (filters.petWeight === "weight0") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogWeight0 === true
//           );
//         }
//         if (filters.petWeight === "weight1") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogWeight1 === true
//           );
//         }
//         if (filters.petWeight === "weight2") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogWeight2 === true
//           );
//         }
//         if (filters.petWeight === "weight3") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogWeight3 === true
//           );
//         }
//         if (filters.petWeight === "weight4") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogWeight4 === true
//           );
//         }
//         if (filters.petWeight === "weight5") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogWeight5 === true
//           );
//         }
//       }
//       //sortowanie po aktywności
//       if (filters.petBehavior) {
//         if (filters.petBehavior === "lazyBehavior") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogActivity0 === true
//           );
//         }
//         if (filters.petBehavior === "averageBehavior") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogActivity1 === true
//           );
//         }
//         if (filters.petBehavior === "crazyBehavior") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogActivity2 === true
//           );
//         }
//       }
//       //sortowanie po plci
//       if (filters.petSex) {
//         if (filters.petSex === "male") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogSex0 === true
//           );
//         }
//         if (filters.petSex === "female") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogSex1 === true
//           );
//         }
//       }
//       //sortowanie po wieku
//       if (filters.petAge) {
//         if (filters.petAge === "young") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogAge0 === true
//           );
//         }
//         if (filters.petAge === "adult") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogAge1 === true
//           );
//         }
//         if (filters.petAge === "old") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.dogAge2 === true
//           );
//         }
//       }
//     }
//     //Sortowanie jezeli kot
//     if (filters.petRace === "cat") {
//       //sortowanie po rodzaju uslugi
//       if (filters.serviceType) {
//         if (filters.serviceType === "walk") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catWalk === true
//           );
//         }
//         if (filters.serviceType === "accom") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catAccom === true
//           );
//         }
//         if (filters.serviceType === "homeVisit") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catHomeVisit === true
//           );
//         }
//       }
//       //sortowanie po wadze
//       if (filters.petWeight) {
//         if (filters.petWeight === "weight0") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catWeight0 === true
//           );
//         }
//         if (filters.petWeight === "weight1") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catWeight1 === true
//           );
//         }
//         if (filters.petWeight === "weight2") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catWeight2 === true
//           );
//         }
//         if (filters.petWeight === "weight3") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catWeight3 === true
//           );
//         }
//         if (filters.petWeight === "weight4") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catWeight4 === true
//           );
//         }
//         if (filters.petWeight === "weight5") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catWeight5 === true
//           );
//         }
//       }
//       //sortowanie po aktywności
//       if (filters.petBehavior) {
//         if (filters.petBehavior === "lazyBehavior") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catActivity0 === true
//           );
//         }
//         if (filters.petBehavior === "averageBehavior") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catActivity1 === true
//           );
//         }
//         if (filters.petBehavior === "crazyBehavior") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catActivity2 === true
//           );
//         }
//       }
//       //sortowanie po plci
//       if (filters.petSex) {
//         if (filters.petSex === "male") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catSex0 === true
//           );
//         }
//         if (filters.petSex === "female") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catSex1 === true
//           );
//         }
//       }
//       // sortowanie po wieku
//       if (filters.petAge) {
//         if (filters.petAge === "young") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catAge0 === true
//           );
//         }
//         if (filters.petAge === "adult") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catAge1 === true
//           );
//         }
//         if (filters.petAge === "old") {
//           filteredPetsitters = filteredPetsitters.filter(
//             (el) => el.checkboxes?.catAge2 === true
//           );
//         }
//       }
//     }
//     setFilteredPetsitters(filteredPetsitters);
//   }
//   return filteredPetsitters;
// };

// export default useFilter;
