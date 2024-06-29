import { useEffect, useState } from "react";
import getPetsitterData, {
  PetsitterDocument,
} from "../../../hooks/getPetsitterData";

interface PricesDog {
  dogHomeVisitPrice: number;
  dogAccomPrice: number;
  dogWalkPrice: number;
}

interface PricesCat {
  catHomeVisitPrice: number;
  catAccomPrice: number;
  catWalkPrice: number;
}

interface Services {
  isAvailable: boolean;
  accom: boolean;
  homeVisit: boolean;
  walk: boolean;
}

const PriceSection = () => {
  const petsitterDocument: PetsitterDocument | null = getPetsitterData();

  const initialPricesDog: PricesDog = {
    dogHomeVisitPrice: 0,
    dogAccomPrice: 0,
    dogWalkPrice: 0,
  };
  const initialPricesCat: PricesCat = {
    catHomeVisitPrice: 0,
    catAccomPrice: 0,
    catWalkPrice: 0,
  };
  const initialServices: Services = {
    isAvailable: false,
    accom: false,
    homeVisit: false,
    walk: false,
  };

  const [prices, setPrices] = useState<{ dog: PricesDog; cat: PricesCat }>({
    dog: initialPricesDog,
    cat: initialPricesCat,
  });
  const [services, setServices] = useState<{ dog: Services; cat: Services }>({
    dog: initialServices,
    cat: initialServices,
  });

  useEffect(() => {
    if (petsitterDocument) {
      const { prices, checkboxes } = petsitterDocument;
      if (prices) {
        setPrices({
          dog: {
            dogHomeVisitPrice: prices[1]?.dogHomeVisitPrice || 0,
            dogAccomPrice: prices[1]?.dogAccomPrice || 0,
            dogWalkPrice: prices[1]?.dogWalkPrice || 0,
          },
          cat: {
            catHomeVisitPrice: prices[0]?.catHomeVisitPrice || 0,
            catAccomPrice: prices[0]?.catAccomPrice || 0,
            catWalkPrice: prices[0]?.catWalkPrice || 0,
          },
        });
      }
      if (checkboxes) {
        setServices({
          dog: {
            isAvailable: checkboxes[1]?.dog || false,
            accom: checkboxes[1]?.dogAccom || false,
            homeVisit: checkboxes[1]?.dogHomeVisit || false,
            walk: checkboxes[1]?.dogWalk || false,
          },
          cat: {
            isAvailable: checkboxes[0]?.cat || false,
            accom: checkboxes[0]?.catAccom || false,
            homeVisit: checkboxes[0]?.catHomeVisit || false,
            walk: checkboxes[0]?.catWalk || false,
          },
        });
      }
    }
  }, [petsitterDocument]);

  return (
    <>
      {(services.dog.isAvailable || services.cat.isAvailable) && (
        <div>
          <h1>Cennik</h1>
          <div>
            <div>
              <h2>Kot</h2>
              {services.cat.accom && (
                <span>Nocleg {prices.cat?.catAccomPrice || "0"}zł</span>
              )}
              {services.cat.homeVisit && (
                <span>
                  Wizyta domowa {prices.cat?.catHomeVisitPrice || "0"}zł
                </span>
              )}
              {services.cat.walk && (
                <span>Spacer {prices.cat?.catWalkPrice || "0"}zł</span>
              )}
            </div>
            <h2>Pies</h2>
            {services.dog.accom && (
              <span>Nocleg {prices.dog?.dogAccomPrice || "0"}zł</span>
            )}
            {services.dog.homeVisit && (
              <span>
                Wizyta domowa {prices.dog?.dogHomeVisitPrice || "0"}zł
              </span>
            )}
            {services.dog.walk && (
              <span>Spacer {prices.dog?.dogWalkPrice || "0"}zł</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PriceSection;
