import { useEffect, useState } from "react";
import getPetsitterData, {
  PetsitterDocument,
} from "../../../hooks/getPetsitterData";

interface Prices {
  homeVisit: number;
  accom: number;
  walk: number;
}

interface Services {
  isAvailable: boolean;
  accom: boolean;
  homeVisit: boolean;
  walk: boolean;
}

const PriceSection = () => {
  const petsitterDocument: PetsitterDocument | null = getPetsitterData();

  const initialPrices: Prices = { homeVisit: 0, accom: 0, walk: 0 };
  const initialServices: Services = {
    isAvailable: false,
    accom: false,
    homeVisit: false,
    walk: false,
  };

  const [prices, setPrices] = useState<{ dog: Prices; cat: Prices }>({
    dog: initialPrices,
    cat: initialPrices,
  });
  const [services, setServices] = useState<{ dog: Services; cat: Services }>({
    dog: initialServices,
    cat: initialServices,
  });

  useEffect(() => {
    if (petsitterDocument) {
      const { prices, animals } = petsitterDocument;
      if (prices) {
        setPrices({
          dog: {
            homeVisit: prices[1]?.dogHomeVisitPrice || 0,
            accom: prices[1]?.dogAccomPrice || 0,
            walk: prices[1]?.dogWalkPrice || 0,
          },
          cat: {
            homeVisit: prices[0]?.catHomeVisitPrice || 0,
            accom: prices[0]?.catAccomPrice || 0,
            walk: prices[0]?.catWalkPrice || 0,
          },
        });
      }
      if (animals) {
        setServices({
          dog: {
            isAvailable: animals[1]?.dog || false,
            accom: animals[1]?.dogAccom || false,
            homeVisit: animals[1]?.dogHomeVisit || false,
            walk: animals[1]?.dogWalk || false,
          },
          cat: {
            isAvailable: animals[0]?.cat || false,
            accom: animals[0]?.catAccom || false,
            homeVisit: animals[0]?.catHomeVisit || false,
            walk: animals[0]?.catWalk || false,
          },
        });
      }
    }
  }, [petsitterDocument]);

  interface RenderPriceSectionProps {
    animal: Services;
    animalPrices: Prices;
    labels: string;
  }

  const renderPriceSection = ({
    animal,
    animalPrices,
    labels,
  }: RenderPriceSectionProps) => (
    <div>
      <h2>{labels}</h2>
      {animal.accom && <span>Nocleg {animalPrices?.accom || "0"}zł</span>}
      {animal.homeVisit && (
        <span>Wizyta domowa {animalPrices?.homeVisit || "0"}zł</span>
      )}
      {animal.walk && <span>Spacer {animalPrices?.walk || "0"}zł</span>}
    </div>
  );

  return (
    <>
      {(services.dog.isAvailable || services.cat.isAvailable) && (
        <div>
          <h1>Cennik</h1>
          {services.dog.isAvailable &&
            renderPriceSection({
              animal: services.dog,
              animalPrices: prices.dog,
              labels: "Pies",
            })}
          {services.cat.isAvailable &&
            renderPriceSection({
              animal: services.cat,
              animalPrices: prices.cat,
              labels: "Kot",
            })}
        </div>
      )}
    </>
  );
};

export default PriceSection;
