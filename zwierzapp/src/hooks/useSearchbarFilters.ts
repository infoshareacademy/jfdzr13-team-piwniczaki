import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export interface Filters {
  petId?: string | null;
  petAge?: string | null;
  petBehavior?: string | null;
  petDescription?: string | null;
  petName?: string | null;
  petRace?: string | null;
  petSex?: string | null;
  petWeight?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  city?: string | null;
  serviceType?: string | null;
}

const useSearchbarFilters = () => {
  const [queryParameters] = useSearchParams();
  let filters = {
    petId: queryParameters.get("petId"),
    minPrice: queryParameters.get("minPrice"),
    maxPrice: queryParameters.get("maxPrice"),
    startDate: queryParameters.get("startDate"),
    endDate: queryParameters.get("endDate"),
    city: queryParameters.get("city"),
    serviceType: queryParameters.get("serviceType"),
  };

  useEffect(() => {
    filters = {
      petId: queryParameters.get("petId"),
      minPrice: queryParameters.get("minPrice"),
      maxPrice: queryParameters.get("maxPrice"),
      startDate: queryParameters.get("startDate"),
      endDate: queryParameters.get("endDate"),
      city: queryParameters.get("city"),
      serviceType: queryParameters.get("serviceType"),
    };
  }, [queryParameters]);

  return filters;
};

export default useSearchbarFilters;
