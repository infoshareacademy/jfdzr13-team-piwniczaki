import { useState, useEffect } from "react";

const useSort = (sortParam, filteredPetsitters, filters) => {
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
    let sortedData = [...filteredPetsitters];

    const sortByName = (asc = true) => {
      sortedData.sort((a, b) => {
        const nameA = a.userData?.name ?? "";
        const nameB = b.userData?.name ?? "";
        const surnameA = a.userData?.surname ?? "";
        const surnameB = b.userData?.surname ?? "";

        const surnameComparison = surnameA.localeCompare(surnameB);
        if (surnameComparison !== 0)
          return asc ? surnameComparison : -surnameComparison;

        return asc ? nameA.localeCompare(nameB) : -nameA.localeCompare(nameB);
      });
    };

    const sortByPrice = (key, asc = true) => {
      sortedData.sort((a, b) => {
        const priceA = a.prices?.[key] ?? 0;
        const priceB = b.prices?.[key] ?? 0;
        return asc ? priceA - priceB : priceB - priceA;
      });
    };

    const serviceTypeMap = {
      dog: {
        walk: "dogWalkPrice",
        accom: "dogAccomPrice",
        homeVisit: "dogHomeVisitPrice",
      },
      cat: {
        walk: "catWalkPrice",
        accom: "catAccomPrice",
        homeVisit: "catHomeVisitPrice",
      },
    };

    if (sortParamState === "byNameAsc") sortByName(true);
    if (sortParamState === "byNameDesc") sortByName(false);

    const petType = filters.petRace;
    const serviceType = filters.serviceType;

    if (petType && serviceType) {
      const priceKey = serviceTypeMap[petType]?.[serviceType];
      if (priceKey) {
        if (sortParamState === "byPriceAsc") sortByPrice(priceKey, true);
        if (sortParamState === "byPriceDesc") sortByPrice(priceKey, false);
      }
    }

    setSortedPetsitters(sortedData);
  }, [sortParamState, filteredPetsitters, filters]);

  return sortedPetsitters;
};

export default useSort;
