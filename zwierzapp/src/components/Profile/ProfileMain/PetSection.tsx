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
            isAvailable: animals?.[1]?.dog || false,
            accom: animals?.[1]?.dogAccom || false,
            activity0: animals?.[1]?.dogActivity0 || false,
            activity1: animals?.[1]?.dogActivity1 || false,
            activity2: animals?.[1]?.dogActivity2 || false,
            homeVisit: animals?.[1]?.dogHomeVisit || false,
            walk: animals?.[1]?.dogWalk || false,
            weight0: animals?.[1]?.dogWeight0 || false,
            weight1: animals?.[1]?.dogWeight1 || false,
            weight2: animals?.[1]?.dogWeight2 || false,
            weight3: animals?.[1]?.dogWeight3 || false,
            weight4: animals?.[1]?.dogWeight4 || false,
            weight5: animals?.[1]?.dogWeight5 || false,
          },
          cat: {
            isAvailable: animals?.[0]?.cat || false,
            accom: animals?.[0]?.catAccom || false,
            activity0: animals?.[0]?.catActivity0 || false,
            activity1: animals?.[0]?.catActivity1 || false,
            activity2: animals?.[0]?.catActivity2 || false,
            homeVisit: animals?.[0]?.catHomeVisit || false,
            walk: animals?.[0]?.catWalk || false,
            weight0: animals?.[0]?.catWeight0 || false,
            weight1: animals?.[0]?.catWeight1 || false,
            weight2: animals?.[0]?.catWeight2 || false,
            weight3: animals?.[0]?.catWeight3 || false,
            weight4: animals?.[0]?.catWeight4 || false,
            weight5: animals?.[0]?.catWeight5 || false,
          },
        });
      }
    }
  }, [petsitterDocument]);

  interface RenderPetSectionProps {
    animal: {
      attr0?: boolean;
      attr1?: boolean;
      attr2?: boolean;
      attr3?: boolean;
      attr4?: boolean;
      attr5?: boolean;
    };
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

  const renderPetSection = ({ animal, labels }: RenderPetSectionProps) => {
    const activityLabels = [
      animal.attr0 && labels.attr0,
      animal.attr1 && labels.attr1,
      animal.attr2 && labels.attr2,
      animal.attr3 && labels.attr3,
      animal.attr4 && labels.attr4,
      animal.attr5 && labels.attr5,
    ].filter(Boolean);

    return (
      <div>
        {labels.title && <span>{labels.title}</span>}
        {activityLabels.length > 0 && <span>{activityLabels.join(", ")}</span>}
      </div>
    );
  };

  return (
    <>
      {(services.dog.isAvailable || services.cat.isAvailable) && (
        <div>
          <h1>Jakimi zwierzakami się zajmujesz</h1>
          {/* render dog section */}
          {services.dog.isAvailable && <h2>Pies</h2>}
          {services.dog.isAvailable &&
            renderPetSection({
              animal: {
                attr0: services.dog.weight0,
                attr1: services.dog.weight1,
                attr2: services.dog.weight2,
                attr3: services.dog.weight3,
                attr4: services.dog.weight4,
                attr5: services.dog.weight5,
              },
              labels: {
                title: "Wielkość zwierzaka",
                attr0: "0-5kg",
                attr1: "5-10kg",
                attr2: "10-15kg",
                attr3: "15-20kg",
                attr4: "20-25kg",
                attr5: "25-30kg",
              },
            })}
          {services.dog.isAvailable &&
            renderPetSection({
              animal: {
                attr0: services.dog.activity0,
                attr1: services.dog.activity1,
                attr2: services.dog.activity2,
              },
              labels: {
                title: "Aktywność fizyczna",
                attr0: "Leniuch",
                attr1: "Normalny",
                attr2: "Średniak",
              },
            })}
          {services.dog.isAvailable &&
            renderPetSection({
              animal: {
                attr0: services.dog.walk,
                attr1: services.dog.accom,
                attr2: services.dog.homeVisit,
              },
              labels: {
                title: "Oferta",
                attr0: "Spacer",
                attr1: "Nocleg",
                attr2: "Wizyta domowa",
              },
            })}
          {/* render cat section */}
          {services.cat.isAvailable && <h2>Kot</h2>}
          {services.cat.isAvailable &&
            renderPetSection({
              animal: {
                attr0: services.cat.weight0,
                attr1: services.cat.weight1,
                attr2: services.cat.weight2,
                attr3: services.cat.weight3,
                attr4: services.cat.weight4,
                attr5: services.cat.weight5,
              },
              labels: {
                title: "Wielkość zwierzaka",
                attr0: "0-5kg",
                attr1: "5-10kg",
                attr2: "10-15kg",
                attr3: "15-20kg",
                attr4: "20-25kg",
                attr5: "25-30kg",
              },
            })}
          {services.cat.isAvailable &&
            renderPetSection({
              animal: {
                attr0: services.cat.activity0,
                attr1: services.cat.activity1,
                attr2: services.cat.activity2,
              },
              labels: {
                title: "Aktywność fizyczna",
                attr0: "Leniuch",
                attr1: "Normalny",
                attr2: "Średniak",
              },
            })}
          {services.cat.isAvailable &&
            renderPetSection({
              animal: {
                attr0: services.cat.walk,
                attr1: services.cat.accom,
                attr2: services.cat.homeVisit,
              },
              labels: {
                title: "Oferta",
                attr0: "Spacer",
                attr1: "Nocleg",
                attr2: "Wizyta domowa",
              },
            })}
        </div>
      )}
    </>
  );
};

export default PetSection;
