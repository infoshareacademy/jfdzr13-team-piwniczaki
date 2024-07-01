import React, { useEffect, useState } from "react";
import styles from "./SearchPetsitters.module.scss";
import getPetData from "../../../hooks/getPetData";
import useAuth from "../../../context/AuthContext";
import { useSearchParams } from "react-router-dom";
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
    petId:  petsArr.length >= 1 ? petsArr[0].id : "",
    serviceType: "walk",
    city: currentUser.city,
    startDate: currentDate,
    endDate: nextDateString,
    minPrice: 10,
    maxPrice: 200,
  };
  
  const [formData, setFormData] = useState<FormField>(initialFormData);
  const [searchParams, setSearchParams] = useSearchParams();
  
  //ustawienie formy parametrów przy pierwszym i kolejnych parametrach
  useEffect(() => {
    let initialSearchQuery = "";

    console.log('heja z useEffect formData - domyślne',formData)
    Object.keys(formData).forEach((paramName) => {
      if (formData[paramName]) {
        if (initialSearchQuery) {
          initialSearchQuery += `&${paramName}=${formData[paramName]}`;
        } else {
          initialSearchQuery += `${paramName}=${formData[paramName]}`;
        }
      }
    });
    console.log('heja z search params w useEffect',searchParams)
    setSearchParams(initialSearchQuery);
  }, []);





  // const handlePriceChange = (e: {
  //   min: number;
  //   max: number;
  //   minValue: number;
  //   maxValue: number;
  // }) => {
  //   setFormData({
  //     ...formData,
  //     minValue: Number(e.minValue),
  //     maxValue: Number(e.maxValue),
  //   });
  //   // console.log('heja z handlePriceChane', formData)
  // };

  // const handlePriceChange = useCallback((e: { min: number; max: number; minValue: number; maxValue: number }) => {
  //   setFormData({
  //     ...formData,
  //     minValue: Number(e.minValue),
  //     maxValue: Number(e.maxValue),
  //   });
  //   console.log('heja z handlePriceChane', formData)
  // }, []);
  
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("handleChange - name:", name, "value:", value);
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    let searchQuery = "";

    formValues.entries().forEach(([paramName, paramValue]) => {
      if (paramName === "city" && typeof paramValue === "string") {
        paramValue = paramValue.trim().toLowerCase().replace(/\s+/g, "-");
      }
      if (paramValue) {
        if (searchQuery) {
          searchQuery += `&${paramName}=${paramValue}`;
        } else {
          searchQuery += `${paramName}=${paramValue}`;
        }
      }
    });

    // if (formData.minValue) {
    //   if (searchQuery) {
    //     searchQuery += `&minValue=${formData.minValue}`;
    //   } else {
    //     searchQuery += `minValue=${formData.minValue}`;
    //   }
    // }

    // if (formData.maxValue) {
    //   if (searchQuery) {
    //     searchQuery += `&minValue=${formData.maxValue}`;
    //   } else {
    //     searchQuery += `minValue=${formData.maxValue}`;
    //   }
    
    console.log('heja z submita', formData)
    setSearchParams(new URLSearchParams(searchQuery));
  };

  return (
    <div>
      {petsArr && 
        <div className={styles.pageContainer}>
          <h1>Wyszukaj opiekuna</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Imię zwierzaka
              <select name="petId" defaultValue={formData.petId} onChange={handleChange}>
                {petsArr.length >= 1 &&
                  petsArr.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              Rodzaj usługi
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
            </label>

            <label>
              Miasto
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </label>

            <label>
              Termin
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                min={currentDate}
                max={formData.endDate}
                onChange={handleChange}
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                min={formData.startDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Cena
              {/* <MultiRangeSlider
                min={0}
                max={200}
                step={10}
                minValue={formData.minValue}
                maxValue={formData.maxValue}
                onInput={handlePriceChange}
              /> */}
              <label>
                min
                <input
                  type="number"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleChange}
                />
              </label>
              <label>
                max
                <input
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
                  min={formData.minPrice}
                  onChange={handleChange}
                />
              </label>
            </label>

            <button type="submit">Szukaj</button>
          </form>
        </div>
      }
  </div>
)};

export default SearchPetsitters;
