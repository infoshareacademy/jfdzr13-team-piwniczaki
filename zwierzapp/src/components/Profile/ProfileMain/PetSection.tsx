import { useEffect, useState } from "react";
import getPetsitterData, {
  PetsitterDocument,
} from "../../../hooks/getPetsitterData";

interface Services {
  isAvailable?: boolean;
  accom?: boolean;
  activity0?: boolean;
  activity1?: boolean;
  activity2?: boolean;
  homeVisit?: boolean;
  walk?: boolean;
  weight0?: boolean;
  weight1?: boolean;
  weight2?: boolean;
  weight3?: boolean;
  weight4?: boolean;
  weight5?: boolean;
}

const PetSection = () => {
  const petsitterDocument: PetsitterDocument | null = getPetsitterData();

  const initialServices: Services = {
    isAvailable: false,
    accom: false,
    activity0: false,
    activity1: false,
    activity2: false,
    homeVisit: false,
    walk: false,
    weight0: false,
    weight1: false,
    weight2: false,
    weight3: false,
    weight4: false,
    weight5: false,
  };

  const [services, setServices] = useState<{ dog: Services; cat: Services }>({
    dog: initialServices,
    cat: initialServices,
  });

  useEffect(() => {
    if (petsitterDocument) {
      const { animals } = petsitterDocument;
      if (animals) {
        setServices({
          dog: {
            isAvailable: animals[1]?.dog || false,
            accom: animals[1]?.dogAccom || false,
            activity0: animals[1]?.dogActivity0 || false,
            activity1: animals[1]?.dogActivity1 || false,
            activity2: animals[1]?.dogActivity2 || false,
            homeVisit: animals[1]?.dogHomeVisit || false,
            walk: animals[1]?.dogWalk || false,
            weight0: animals[1]?.dogWeight0 || false,
            weight1: animals[1]?.dogWeight1 || false,
            weight2: animals[1]?.dogWeight2 || false,
            weight3: animals[1]?.dogWeight3 || false,
            weight4: animals[1]?.dogWeight4 || false,
            weight5: animals[1]?.dogWeight5 || false,
          },
          cat: {
            isAvailable: animals[0]?.cat || false,
            accom: animals[0]?.catAccom || false,
            activity0: animals[0]?.catActivity0 || false,
            activity1: animals[0]?.catActivity1 || false,
            activity2: animals[0]?.catactivity2 || false,
            homeVisit: animals[0]?.catHomeVisit || false,
            walk: animals[0]?.catWalk || false,
            weight0: animals[0]?.catWeight0 || false,
            weight1: animals[0]?.catWeight1 || false,
            weight2: animals[0]?.catWeight2 || false,
            weight3: animals[0]?.catWeight3 || false,
            weight4: animals[0]?.catWeight4 || false,
            weight5: animals[0]?.catWeight5 || false,
          },
        });
      }
    }
  }, [petsitterDocument]);

  interface RenderPriceSectionProps {
    animal: Services;
    labels: {
      title: string;
      attr0?: string;
      attr1?: string;
      attr2?: string;
      attr3?: string;
      attr4?: string;
      attr5?: string;
    };
  }

  const renderPriceSection = ({ animal, labels }: RenderPriceSectionProps) => (
    <div>
      {labels && <span>{labels.title}</span>}
      {animal && (
        <span>
          {labels.attr0 && labels.attr0}
          {labels.attr1 && ", " + labels.attr1}
          {labels.attr2 && ", " + labels.attr2}
          {labels.attr3 && ", " + labels.attr3}
          {labels.attr4 && ", " + labels.attr4}
          {labels.attr5 && ", " + labels.attr5}
        </span>
      )}
    </div>
  );

  return (
    <>
      {(services.dog.isAvailable || services.cat.isAvailable) && (
        <div>
          <h1>Jakimi zwierzakami się zajmujesz</h1>
          {services.dog.isAvailable &&
            renderPriceSection({
              animal: {
                attr0: services.dog.activity0,
              },
              labels: {
                title: "Wielkość zwierzaka",
                attr0: "Mały",
                attr1: "Średni",
                attr2: "Duży",
              },
            })}
        </div>
      )}
    </>
  );
};

export default PetSection;
