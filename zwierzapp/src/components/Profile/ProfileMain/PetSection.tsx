import { useEffect, useState } from "react";
import getPetsitterData, {
  PetsitterDocument,
} from "../../../hooks/getPetsitterData";
import styles from './PetSection.module.scss'

interface Checkboxes {
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

  const initialCheckboxes: Checkboxes = {
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

  const [checkboxes, setCheckboxes] = useState<{
    dog: Checkboxes;
    cat: Checkboxes;
  }>({
    dog: initialCheckboxes,
    cat: initialCheckboxes,
  });

  useEffect(() => {
    if (petsitterDocument) {
      const { checkboxes } = petsitterDocument;
      if (checkboxes) {
        setCheckboxes({
          dog: {
            isAvailable: checkboxes?.dog || false,
            accom: checkboxes?.dogAccom || false,
            activity0: checkboxes?.dogActivity0 || false,
            activity1: checkboxes?.dogActivity1 || false,
            activity2: checkboxes?.dogActivity2 || false,
            homeVisit: checkboxes?.dogHomeVisit || false,
            walk: checkboxes?.dogWalk || false,
            weight0: checkboxes?.dogWeight0 || false,
            weight1: checkboxes?.dogWeight1 || false,
            weight2: checkboxes?.dogWeight2 || false,
            weight3: checkboxes?.dogWeight3 || false,
            weight4: checkboxes?.dogWeight4 || false,
            weight5: checkboxes?.dogWeight5 || false,
          },
          cat: {
            isAvailable: checkboxes?.cat || false,
            accom: checkboxes?.catAccom || false,
            activity0: checkboxes?.catActivity0 || false,
            activity1: checkboxes?.catActivity1 || false,
            activity2: checkboxes?.catActivity2 || false,
            homeVisit: checkboxes?.catHomeVisit || false,
            walk: checkboxes?.catWalk || false,
            weight0: checkboxes?.catWeight0 || false,
            weight1: checkboxes?.catWeight1 || false,
            weight2: checkboxes?.catWeight2 || false,
            weight3: checkboxes?.catWeight3 || false,
            weight4: checkboxes?.catWeight4 || false,
            weight5: checkboxes?.catWeight5 || false,
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
      <>
      <div className={styles.petActivity}>
        {labels.title && <span>{labels.title}</span>}
        {activityLabels.length > 0 && <span>{activityLabels.join(", ")}</span>}
      </div>
      <div className={styles.barLine}></div>
      </>
    );
  };

  return (
    <>
      {(checkboxes.dog.isAvailable || checkboxes.cat.isAvailable) && (
        <div>
          <h1>Jakimi zwierzakami się zajmujesz</h1>
          {checkboxes.cat.isAvailable && <h2>Kot</h2>}
          {checkboxes.cat.isAvailable &&
            renderPetSection({
              animal: {
                attr0: checkboxes.cat.weight0,
                attr1: checkboxes.cat.weight1,
                attr2: checkboxes.cat.weight2,
                attr3: checkboxes.cat.weight3,
                attr4: checkboxes.cat.weight4,
                attr5: checkboxes.cat.weight5,
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
          {checkboxes.cat.isAvailable &&
            renderPetSection({
              animal: {
                attr0: checkboxes.cat.activity0,
                attr1: checkboxes.cat.activity1,
                attr2: checkboxes.cat.activity2,
              },
              labels: {
                title: "Aktywność fizyczna",
                attr0: "Leniuch",
                attr1: "Normalny",
                attr2: "Średniak",
              },
            })}
          {checkboxes.cat.isAvailable &&
            renderPetSection({
              animal: {
                attr0: checkboxes.cat.walk,
                attr1: checkboxes.cat.accom,
                attr2: checkboxes.cat.homeVisit,
              },
              labels: {
                title: "Oferta",
                attr0: "Spacer",
                attr1: "Nocleg",
                attr2: "Wizyta domowa",
              },
            })}
          {checkboxes.dog.isAvailable && <h2>Pies</h2>}
          {checkboxes.dog.isAvailable &&
            renderPetSection({
              animal: {
                attr0: checkboxes.dog.weight0,
                attr1: checkboxes.dog.weight1,
                attr2: checkboxes.dog.weight2,
                attr3: checkboxes.dog.weight3,
                attr4: checkboxes.dog.weight4,
                attr5: checkboxes.dog.weight5,
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
          {checkboxes.dog.isAvailable &&
            renderPetSection({
              animal: {
                attr0: checkboxes.dog.activity0,
                attr1: checkboxes.dog.activity1,
                attr2: checkboxes.dog.activity2,
              },
              labels: {
                title: "Aktywność fizyczna",
                attr0: "Leniuch",
                attr1: "Normalny",
                attr2: "Średniak",
              },
            })}
          {checkboxes.dog.isAvailable &&
            renderPetSection({
              animal: {
                attr0: checkboxes.dog.walk,
                attr1: checkboxes.dog.accom,
                attr2: checkboxes.dog.homeVisit,
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
