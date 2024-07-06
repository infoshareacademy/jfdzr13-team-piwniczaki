import styles from "./AddPetsitter.module.scss";
import { useState, useEffect } from "react";
import useAuth from "../../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useData from "../../context/DataContext";
import { Link } from "react-router-dom";
import arrowback from "../../images/arrow_back.svg"

function AddPetsitter() {
  const dataContext = useData();
  const authContext = useAuth();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);


  const initialCheckboxes = {
    cat: false,
    catSex0: false,
    catSex1: false,
    catAge0: false,
    catAge1: false,
    catAge2: false,
    catActivity0: false,
    catActivity1: false,
    catActivity2: false,
    catWeight0: false,
    catWeight1: false,
    catWeight2: false,
    catWeight3: false,
    catWeight4: false,
    catWalk: false,
    catAccom: false,
    catHomeVisit: false,
    dog: false,
    dogSex0: false,
    dogSex1: false,
    dogAge0: false,
    dogAge1: false,
    dogAge2: false,
    dogActivity0: false,
    dogActivity1: false,
    dogActivity2: false,
    dogWeight0: false,
    dogWeight1: false,
    dogWeight2: false,
    dogWeight3: false,
    dogWeight4: false,
    dogWeight5: false,
    dogWalk: false,
    dogAccom: false,
    dogHomeVisit: false,
  };

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const initialPrices = {
    catWalkPrice: 0,
    catAccomPrice: 0,
    catHomeVisitPrice: 0,
    dogWalkPrice: 0,
    dogAccomPrice: 0,
    dogHomeVisitPrice: 0,
  };

  const [prices, setPrices] = useState(initialPrices);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dataContext && authContext && authContext.currentUser) {
        const { getUserFromDatabase } = dataContext;
        const { currentUser } = authContext;
        const uid = currentUser.uid;
        const userData = await getUserFromDatabase("Petsitters", uid);

        if (userData) {
          setCheckboxes(userData.checkboxes || initialCheckboxes);
          setPrices(userData.prices || initialPrices);
          setIsEditMode(false);
          setIsFirstTime(false);
        } else {
          console.error("Nie zostałeś jeszcze petsitterem");
          setIsFirstTime(true);
          setIsEditMode(true);
        }
      } else {
        console.error("Wystąpił błąd");
      }
    };
    fetchData();
  }, [dataContext, authContext]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPrices((prev) => ({
      ...prev,
      [name]: value ? parseInt(value) : 0,
    }));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (parseInt(value) === 0) {
      setPrices((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value === '') {
      setPrices((prev) => ({
        ...prev,
        [name]: 0,
      }));
    }
  };
  const handleReset = () => {
    setCheckboxes(initialCheckboxes)
  }

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loadingToastId = toast.loading("Dodawanie danych...");

    if (!checkboxes.dog && !checkboxes.cat) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jedną opcję", { id: "race" });
      return;
    }
    if (
      (checkboxes.dog &&
        !(
          checkboxes.dogActivity0 ||
          checkboxes.dogActivity1 ||
          checkboxes.dogActivity2
        )) ||
      (checkboxes.cat &&
        !(
          checkboxes.catActivity0 ||
          checkboxes.catActivity1 ||
          checkboxes.catActivity2
        ))
    ) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jeden rodzaj aktywności fizycznej", {
        id: "activity",
      });
      return;
    }
    if (
      (checkboxes.dog &&
        !(
          checkboxes.dogWeight0 ||
          checkboxes.dogWeight1 ||
          checkboxes.dogWeight2 ||
          checkboxes.dogWeight3 ||
          checkboxes.dogWeight4 ||
          checkboxes.dogWeight5
        )) ||
      (checkboxes.cat &&
        !(
          checkboxes.catWeight0 ||
          checkboxes.catWeight1 ||
          checkboxes.catWeight2 ||
          checkboxes.catWeight3 ||
          checkboxes.catWeight4
        ))
    ) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jeden zakres wagi", { id: "weight" });
      return;
    }
    if (
      (checkboxes.dog &&
        !(
          checkboxes.dogHomeVisit ||
          checkboxes.dogWalk ||
          checkboxes.dogAccom
        )) ||
      (checkboxes.cat &&
        !(checkboxes.catHomeVisit || checkboxes.catWalk || checkboxes.catAccom))
    ) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jedną usługę", { id: "offer" });
      return;
    }
    if (
      (checkboxes.dog &&
        !(
          checkboxes.dogAge0 ||
          checkboxes.dogAge1 ||
          checkboxes.dogAge2
        )) ||
      (checkboxes.cat &&
        !(
          checkboxes.catAge0 ||
          checkboxes.catAge1 ||
          checkboxes.catAge2
        ))
    ) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jedną grupę wiekową ", {
        id: "age",
      });
      return;
    }
    if (
      (checkboxes.dog &&
        !(
          checkboxes.dogSex0 ||
          checkboxes.dogSex1
        )) ||
      (checkboxes.cat &&
        !(
          checkboxes.catSex0 ||
          checkboxes.catSex1
        ))
    ) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jedną płeć", {
        id: "sex",
      });
      return;
    }
    try {
      if (dataContext && authContext && authContext.currentUser) {
        const { currentUser } = authContext;
        const { updateUserToDatabase } = dataContext;
        const uid = currentUser.uid;

        if (isFirstTime) {
          await addDoc(collection(db, "Petsitters"), {
            prices: prices,
            checkboxes: checkboxes,
            userId: currentUser.uid,
          });
          toast.success("Przesłano dane", { id: loadingToastId });
          setIsFirstTime(false);
        } else {
          await updateUserToDatabase("Petsitters", uid, { prices, checkboxes });
          toast.success("Zaktualizowano dane", { id: loadingToastId });
          setIsEditMode(false);
        }

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("Błąd podczas zapisywania danych");
    }
  };
  return (
    <div className={styles.AddPetsitterPage}>
      <article className={styles.addPetsitterContainer}>
        {!isFirstTime && !isEditMode && (
          <div>
            <Link to="/profile" className={styles.getBackElement}><img src={arrowback}></img>wróć</Link>
          </div>
        )}
        <h1>Zostań petsitterem!</h1>
        <h2>Jakimi zwierzętami chcesz się opiekować?</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputWrapper}>

            <div className={styles.dog}>
              <div className={styles.inputSelectWrapper}>
                <label >
                  <input
                    name="dog"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={checkboxes.dog}
                    disabled={!isEditMode}
                  />
                  Pies
                </label>
              </div>
              {checkboxes.dog && (
                <>
                  <h3>Płeć</h3>
                  <div className={styles.inputSelectWrapper}>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogSex0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogSex0}
                        disabled={!isEditMode}
                      />
                      Pies
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogSex1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogSex1}
                        disabled={!isEditMode}
                      />
                      Suczka
                    </label>
                  </div>
                  <h3>Wiek</h3>
                  <div className={styles.inputSelectWrapper}>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogAge0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogAge0}
                        disabled={!isEditMode}
                      />
                      Młody
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogAge1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogAge1}
                        disabled={!isEditMode}
                      />
                      Dorosły
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogAge2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogAge2}
                        disabled={!isEditMode}
                      />
                      Stary
                    </label>
                  </div>
                  <h3>Aktywność Fizyczna</h3>
                  <div className={styles.inputSelectWrapper}>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogActivity0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogActivity0}
                        disabled={!isEditMode}
                      />
                      Leniuch
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogActivity1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogActivity1}
                        disabled={!isEditMode}
                      />
                      Średniak
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogActivity2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogActivity2}
                        disabled={!isEditMode}
                      />
                      Wariat
                    </label>
                  </div>
                  <h3>Waga</h3>
                  <div className={styles.inputSelectWrapper}>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogWeight0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogWeight0}
                        disabled={!isEditMode}
                      />
                      &lt;5kg
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogWeight1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogWeight1}
                        disabled={!isEditMode}
                      />
                      5-10kg
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogWeight2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogWeight2}
                        disabled={!isEditMode}
                      />
                      10-15kg
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogWeight3"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogWeight3}
                        disabled={!isEditMode}
                      />
                      15-20kg
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="dogWeight4"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogWeight4}
                        disabled={!isEditMode}
                      />
                      20+kg
                    </label>
                  </div>
                  <h3>Oferta</h3>
                  <div className={styles.inputSelectWrapper}>
                    <div className={styles.inputCheckBoxPrice}>
                      <label className={styles.singleCheckbox}>
                        <input
                          type="checkbox"
                          name="dogWalk"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogWalk}
                          disabled={!isEditMode}
                        />
                        Spacer
                      </label>
                      {checkboxes.dogWalk && (
                        <label className={styles.inputPriceWithCurrency}>
                          <input
                            type="number"
                            name="dogWalkPrice"
                            value={prices.dogWalkPrice}
                            min={0}
                            className={styles.inputPrice}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handlePriceInput}
                            disabled={!isEditMode}
                          />
                          <span>PLN</span>
                        </label>
                      )}
                    </div>
                    <div className={styles.inputCheckBoxPrice}>
                      <label className={styles.singleCheckbox}>
                        <input
                          type="checkbox"
                          name="dogAccom"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogAccom}
                          disabled={!isEditMode}
                        />
                        Nocleg
                      </label>
                      {checkboxes.dogAccom && (
                        <label className={styles.inputPriceWithCurrency}>
                          <input
                            type="number"
                            name="dogAccomPrice"
                            value={prices.dogAccomPrice}
                            min={0}
                            className={styles.inputPrice}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handlePriceInput}
                            disabled={!isEditMode}
                          />
                          <span>PLN</span>
                        </label>
                      )}
                    </div>
                    <div className={styles.inputCheckBoxPrice}>
                      <label className={styles.singleCheckbox}>
                        <input
                          type="checkbox"
                          name="dogHomeVisit"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogHomeVisit}
                          disabled={!isEditMode}
                        />
                        Wizyta Domowa
                      </label>
                      {checkboxes.dogHomeVisit && (
                        <label className={styles.inputPriceWithCurrency}>
                          <input
                            type="number"
                            name="dogHomeVisitPrice"
                            value={prices.dogHomeVisitPrice}
                            min={0}
                            className={styles.inputPrice}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handlePriceInput}
                            disabled={!isEditMode}
                          />
                          <span>PLN</span>
                        </label>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.cat}>
              <div className={styles.inputSelectWrapper}>
                <label>
                  <input
                    name="cat"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={checkboxes.cat}
                    disabled={!isEditMode}
                  />
                  Kot
                </label>
              </div>
              {checkboxes.cat && (
                <>
                  <h3>Płeć</h3>
                  <div className={styles.inputSelectWrapper}>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catSex0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catSex0}
                        disabled={!isEditMode}
                      />
                      Kot
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catSex1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catSex1}
                        disabled={!isEditMode}
                      />
                      Kotka
                    </label>
                  </div>
                  <h3>Wiek</h3>
                  <div className={styles.inputSelectWrapper}>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catAge0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catAge0}
                        disabled={!isEditMode}
                      />
                      Młody
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catAge1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catAge1}
                        disabled={!isEditMode}
                      />
                      Dorosły
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catAge2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catAge2}
                        disabled={!isEditMode}
                      />
                      Stary
                    </label>
                  </div>
                  <h3>Akytwność Fizyczna</h3>
                  <div className={styles.inputSelectWrapper}>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catActivity0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catActivity0}
                        disabled={!isEditMode}
                      />
                      Leniuch
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catActivity1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catActivity1}
                        disabled={!isEditMode}
                      />
                      Średniak
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catActivity2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catActivity2}
                        disabled={!isEditMode}
                      />
                      Wariat
                    </label>
                  </div>
                  <h3>Waga</h3>
                  <div className={styles.inputSelectWrapper}>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catWeight0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight0}
                        disabled={!isEditMode}
                      />
                      &lt;2kg
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catWeight1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight1}
                        disabled={!isEditMode}
                      />
                      2-4kg
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catWeight2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight2}
                        disabled={!isEditMode}
                      />
                      4-6kg
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catWeight3"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight3}
                        disabled={!isEditMode}
                      />
                      6-8kg
                    </label>
                    <label className={styles.singleCheckbox}>
                      <input
                        name="catWeight4"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight4}
                        disabled={!isEditMode}
                      />
                      8+kg
                    </label>
                  </div>
                  <h3>Oferta</h3>
                  <div className={styles.inputSelectWrapper}>
                    <div className={styles.inputCheckBoxPrice}>
                      <label className={styles.singleCheckbox}>
                        <input
                          type="checkbox"
                          name="catWalk"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.catWalk}
                          disabled={!isEditMode}
                        />
                        Spacer
                      </label>
                      {checkboxes.catWalk && (
                        <label className={styles.inputPriceWithCurrency}>
                          <input
                            type="number"
                            name="catWalkPrice"
                            value={prices.catWalkPrice}
                            min={0}
                            className={styles.inputPrice}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handlePriceInput}
                            disabled={!isEditMode}
                          />
                          <span>PLN</span>
                        </label>
                      )}
                    </div>
                    <div className={styles.inputCheckBoxPrice}>
                      <label className={styles.singleCheckbox}>
                        <input
                          type="checkbox"
                          name="catAccom"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.catAccom}
                          disabled={!isEditMode}
                        />
                        Nocleg
                      </label>
                      {checkboxes.catAccom && (
                        <label className={styles.inputPriceWithCurrency}>
                          <input
                            type="number"
                            name="catAccomPrice"
                            value={prices.catAccomPrice}
                            min={0}
                            className={styles.inputPrice}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handlePriceInput}
                            disabled={!isEditMode}
                          />
                          <span>PLN</span>
                        </label>
                      )}
                    </div>
                    <div className={styles.inputCheckBoxPrice}>
                      <label className={styles.singleCheckbox}>
                        <input
                          type="checkbox"
                          name="catHomeVisit"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.catHomeVisit}
                          disabled={!isEditMode}
                        />
                        Wizyta Domowa
                      </label>
                      {checkboxes.catHomeVisit && (
                        <label className={styles.inputPriceWithCurrency}>
                          <input
                            type="number"
                            name="catHomeVisitPrice"
                            value={prices.catHomeVisitPrice}
                            min={0}
                            className={styles.inputPrice}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handlePriceInput}
                            disabled={!isEditMode}
                          />
                          <span>PLN</span>
                        </label>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            {!isFirstTime && !isEditMode && (
              <button type="button" className={`${styles.primaryButton} ${styles.addPetSitterButton}`} onClick={handleEditClick}>
                Edytuj
              </button>
            )}
            {!isFirstTime && isEditMode && (
              <button type="button" className={`${styles.primaryButton} ${styles.addPetSitterButton}`} onClick={handleReset}>
                Wyczyść
              </button>
            )}
            <button type="submit" className={`${styles.primaryButton} ${styles.addPetSitterButton}`}>Zapisz</button>
          </div>
        </form>
      </article>
    </div >
  );
}

export default AddPetsitter;
