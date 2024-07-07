import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../../context/AuthContext";
import getPetData from "../../../hooks/getPetData";
import styles from "./SearchPetsitters.module.scss";
interface FormField {
  [key: string]: string | number;
}

const SearchPetsitters = () => {
  const { currentUser } = useAuth() || {};

  const petsArr = getPetData(currentUser.uid);

  const currentDate = new Date().toISOString().split("T")[0];
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateString = nextDate.toISOString().split("T")[0];

  const initialFormData: FormField = {
    petId: petsArr.length >= 1 ? petsArr[0].id : "",
    serviceType: "walk",
    city: currentUser.city,
    startDate: currentDate,
    endDate: nextDateString,
    minPrice: 10,
    maxPrice: 200,
  };

  const [formData, setFormData] = useState<FormField>(initialFormData);
  const [searchParams, setSearchParams] = useSearchParams();

  function capitalizeCityName(city: string) {
    if (!city) return "";
    return city
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const updateFormDataFromSearchParams = (searchParams, formData) => {
    const queryParameters = new URLSearchParams(searchParams.toString());
    return {
      petId: queryParameters.get("petId") || formData.petId,
      minPrice: queryParameters.get("minPrice") || formData.minPrice,
      maxPrice: queryParameters.get("maxPrice") || formData.maxPrice,
      startDate: queryParameters.get("startDate") || formData.startDate,
      endDate: queryParameters.get("endDate") || formData.endDate,
      city: capitalizeCityName(
        queryParameters.get("city") || formData.city
      ),
      serviceType:
        queryParameters.get("serviceType") || formData.serviceType,
    };
  };

  useEffect(() => {
    setFormData(updateFormDataFromSearchParams(searchParams, formData));
  }, [searchParams]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (
      (name === "startDate" || name === "endDate") &&
      name === "startDate" &&
      formData.endDate < value
    ) {
      setFormData((prevState) => ({
        ...prevState,
        startDate: value,
        endDate: value, // Ustaw endDate na startDate, jeśli jest wcześniejsze
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    let newSearchParams = new URLSearchParams();

    formValues.forEach((paramValue, paramName) => {
      if (paramName === "city" && typeof paramValue === "string") {
        paramValue = paramValue.trim().toLowerCase().replace(/\s+/g, "-");
      }
      newSearchParams.set(paramName, paramValue.toString());
    });
    setSearchParams(newSearchParams);
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Wyszukaj opiekuna</h1>
        <label className={styles.labelPetName}>
          <span>Imię zwierzaka</span>
          <select name="petId" onChange={handleChange}>
            {petsArr.length >= 1 &&
              petsArr.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          <span>Rodzaj usługi</span>
          <div className={styles.labelServiceContainer}>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="walk"
                onChange={handleChange}
                checked={formData.serviceType === "walk"}
              />{" "}
              Spacer{" "}
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="accom"
                onChange={handleChange}
                checked={formData.serviceType === "accom"}
              />{" "}
              Nocleg{" "}
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="homeVisit"
                onChange={handleChange}
                checked={formData.serviceType === "homeVisit"}
              />{" "}
              Wizyta domowa{" "}
            </label>
          </div>
        </label>

        <label className={styles.labelCity}>
          <span>Miasto</span>
          <input
            className={styles.inputCity}
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>

        <label className={styles.labelDateContainer}>
          <span>Termin</span>
          <div className={styles.labelDate}>
            <input
              className={styles.inputStartDate}
              type="date"
              name="startDate"
              value={formData.startDate}
              min={currentDate}
              onChange={handleChange}
            />
            <input
              className={styles.inputEndDate}
              type="date"
              name="endDate"
              value={formData.endDate}
              min={formData.startDate}
              onChange={handleChange}
            />
          </div>
        </label>

        <label className={styles.labelPriceContainer}>
          <span>Cena</span>
          <div className={styles.priceWrapper}>
            <label className={styles.labelMinPrice}>
              <span>min</span>
              <input
                className={styles.inputMinPrice}
                type="number"
                name="minPrice"
                value={formData.minPrice}
                onChange={handleChange}
              />
            </label>
            <label className={styles.labelMaxPrice}>
              <span>max</span>
              <input
                className={styles.inputMaxPrice}
                type="number"
                name="maxPrice"
                value={formData.maxPrice}
                min={formData.minPrice}
                onChange={handleChange}
              />
            </label>
          </div>
        </label>

        <button
          type="submit"
          className={`${styles.searchButton} ${styles.primaryButton}`}
        >
          Szukaj
        </button>
      </form>
    </div>
  );
};

export default SearchPetsitters;
