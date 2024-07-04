import { useEffect, useState } from "react";
import getPetsitterData, {
  PetsitterDocument,
} from "../../../hooks/getPetsitterData";
import styles from './PriceSection.module.scss'
type Prices = {
  dogHomeVisitPrice: number;
  dogAccomPrice: number;
  dogWalkPrice: number;
  catHomeVisitPrice: number;
  catAccomPrice: number;
  catWalkPrice: number;
};

type Services = {
  dogIsAvailable: boolean;
  dogAccom: boolean;
  dogHomeVisit: boolean;
  dogWalk: boolean;
  catIsAvailable: boolean;
  catAccom: boolean;
  catHomeVisit: boolean;
  catWalk: boolean;
};

const PriceSection: React.FC = () => {
  const petsitterDocument: PetsitterDocument | null = getPetsitterData();

  const initialPrices: Prices = {
    dogHomeVisitPrice: 0,
    dogAccomPrice: 0,
    dogWalkPrice: 0,
    catHomeVisitPrice: 0,
    catAccomPrice: 0,
    catWalkPrice: 0,
  };

  const initialServices: Services = {
    dogIsAvailable: false,
    dogAccom: false,
    dogHomeVisit: false,
    dogWalk: false,
    catIsAvailable: false,
    catAccom: false,
    catHomeVisit: false,
    catWalk: false,
  };

  const [prices, setPrices] = useState<Prices>(initialPrices);
  const [services, setServices] = useState<Services>(initialServices);

  useEffect(() => {
    if (petsitterDocument) {
      const { prices, checkboxes } = petsitterDocument;
      if (prices) {
        setPrices({
          dogHomeVisitPrice: prices.dogHomeVisitPrice ?? 0,
          dogAccomPrice: prices.dogAccomPrice ?? 0,
          dogWalkPrice: prices.dogWalkPrice ?? 0,
          catHomeVisitPrice: prices.catHomeVisitPrice ?? 0,
          catAccomPrice: prices.catAccomPrice ?? 0,
          catWalkPrice: prices.catWalkPrice ?? 0,
        });
      }
      if (checkboxes) {
        setServices({
          dogIsAvailable: checkboxes.dog ?? false,
          dogAccom: checkboxes.dogAccom ?? false,
          dogHomeVisit: checkboxes.dogHomeVisit ?? false,
          dogWalk: checkboxes.dogWalk ?? false,
          catIsAvailable: checkboxes.cat ?? false,
          catAccom: checkboxes.catAccom ?? false,
          catHomeVisit: checkboxes.catHomeVisit ?? false,
          catWalk: checkboxes.catWalk ?? false,
        });
      }
    }
  }, [petsitterDocument]);

  return (
    <>
      {(services.dogIsAvailable || services.catIsAvailable) && (
        <div>
          <h1>Cennik</h1>
          <div>
            {services.catIsAvailable && (
              <div>
                <h2>Kot</h2>
                {services.catAccom && (
                  <>
                    <span className={styles.priceLine}>
                      <p>Nocleg</p> <p>{prices.catAccomPrice}zł</p>
                    </span>
                    <div className={styles.priceBar}>
                    </div>
                  </>
                )}
                {services.catHomeVisit && (
                  <>
                    <span className={styles.priceLine}>
                      <p>Wizyta domowa</p> <p>{prices.catHomeVisitPrice}zł</p>
                    </span>
                    <div className={styles.priceBar}>
                    </div>
                  </>
                )}
                {services.catWalk && (
                  <>
                    <span className={styles.priceLine}>
                      <p>Spacer</p> <p>{prices.catWalkPrice}zł</p>
                    </span>
                    <div className={styles.priceBar}>
                    </div>
                  </>
                )}
              </div>
            )}
            {services.dogIsAvailable && (
              <div>
                <h2>Pies</h2>
                {services.dogAccom && (
                  <>
                    <span className={styles.priceLine}>
                      <p>Nocleg</p> <p>{prices.dogAccomPrice}zł</p>
                    </span>
                    <div className={styles.priceBar}>
                    </div>
                  </>
                )}
                {services.dogHomeVisit && (
                  <>
                    <span className={styles.priceLine}>
                      <p>Wizyta domowa</p> <p>{prices.dogHomeVisitPrice}zł</p>
                    </span>
                    <div className={styles.priceBar}>
                    </div>
                  </>
                )}
                {services.dogWalk && (
                  <>
                    <span className={styles.priceLine}>
                      <p>Spacer</p> <p>{prices.dogWalkPrice}zł</p>
                    </span>
                    <div className={styles.priceBar}>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PriceSection;
