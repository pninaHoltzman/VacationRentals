import { useEffect, useState } from "react";
import { getAllApartments, getAllCategories, getApartmentByCategory, getApartmentByCity, getApartmentById, getApartmentByRangeBed, getApartmentByRangePrice, getCity } from "../api";
import '../style.css'
import { Card } from "./Card"
import { Search } from "@mui/icons-material";

export const HomePage = () => {
  const [list, setList] = useState([]);
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);

  const [idCity, setIdCity] = useState(null);  
  const [idCategory, setIdCategory] = useState(null);
  const [search, setSearch] = useState(false);
  const [Null, setNull] = useState(false);
  const [max, setMax] = useState(null);
  const [min, setMin] = useState(null);
  const [maxPrice1, setMaxPrice1] = useState(null);
  const [minPrice1, setMinPrice1] = useState(null);



  useEffect(() => {
    getCity()
      .then(y => {
        setCity(y.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllCategories()
      .then(z => {
        setCategory(z.data.categories);
        console.log("category", category);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const finalApartments = async () => {
      let apartments = [];
      //סינון לפי כל השדות
      if (idCity && minPrice1 && maxPrice1 && idCategory && min && max && search) {
        const apartmentsByCity = await getApartmentByCity(idCity);
        const apartmentsByCategory = await getApartmentByCategory(idCategory);

        apartments = apartmentsByCity.data.filter(apartment => 
            apartmentsByCategory.data.some(catApartment =>
                catApartment._id === apartment._id) &&
            (minPrice1 ? apartment.price >= minPrice1 : true) &&
            (maxPrice1 ? apartment.price <= maxPrice1 : true) &&
            (min ? apartment.bedsNumber >= min : true) &&
            (max ? apartment.bedsNumber <= max : true)
        );
        if (apartments.length === 0) setNull(true);
    }
    // סינון לפי עיר, קטגוריה ודירות
    else if (idCity && idCategory && min && max && search) {
      const apartmentsByCity = await getApartmentByCity(idCity);
      const apartmentsByCategory = await getApartmentByCategory(idCategory);

      apartments = apartmentsByCity.data.filter(apartment => 
          apartmentsByCategory.data.some(catApartment =>
              catApartment._id === apartment._id) &&
          (min ? apartment.bedsNumber >= min : true) &&
          (max ? apartment.bedsNumber <= max : true)
      );
      if (apartments.length === 0) setNull(true);
  }
  // סינון לפי קטגוריה, דירות ומחיר
  else if (idCategory && min && max && minPrice1 && maxPrice1 && search) {
      const apartmentsByCategory = await getApartmentByCategory(idCategory);
      apartments = apartmentsByCategory.data.filter(apartment => {
          const byPrice = apartment.price; // הנחתי שיש שדה כזה
          return (minPrice1 ? byPrice >= minPrice1 : true) &&
                 (maxPrice1 ? byPrice <= maxPrice1 : true) &&
                 (min ? apartment.bedsNumber >= min : true) &&
                 (max ? apartment.bedsNumber <= max : true);
      });
      if (apartments.length === 0) setNull(true);
  }
    //סינון לפי עיר מחיר וקטגוריה
    else if (idCity && minPrice1 && maxPrice1 && idCategory && search) {
      const apartmentsByCity = await getApartmentByCity(idCity);
      const apartmentsByCategory = await getApartmentByCategory(idCategory);

      apartments = apartmentsByCity.data.filter(apartment => 
          apartmentsByCategory.data.some(catApartment =>
              catApartment._id === apartment._id) &&
          (minPrice1 ? apartment.price >= minPrice1 : true) &&
          (maxPrice1 ? apartment.price <= maxPrice1 : true)
      );
      if (apartments.length === 0) setNull(true);
  }
      //סינון לפי עיר וקטגריה
      else if (idCity && idCategory && search) {
        const apartmentsByCategory = await getApartmentByCategory(idCategory);
        const apartmentsByCity = await getApartmentByCity(idCity);

        apartments = apartmentsByCity.data.filter(apartment => 
          apartmentsByCategory.data.some(catApartment =>
            catApartment._id === apartment._id)
        );
      } 
      // סינון לפי עיר ומחיר
      else if (idCity && minPrice1 && maxPrice1 && search) {
        const apartmentsByCity = await getApartmentByCity(idCity);
        apartments = apartmentsByCity.data.filter(apartment => {
            const byPrice = apartment.price; // הנחתי שיש שדה כזה
            return (minPrice1 ? byPrice >= minPrice1 : true) && (maxPrice1 ? byPrice <= maxPrice1 : true);
        });
        if (apartments.length === 0) setNull(true);
    }
    // סינון לפי עיר ומיטות
    else if (idCity && min && max && search) {
        const apartmentsByCity = await getApartmentByCity(idCity);
        apartments = apartmentsByCity.data.filter(apartment => {
            const beds = apartment.bedsNumber; // הנחתי שיש שדה כזה
            return (min ? beds >= min : true) && (max ? beds <= max : true);
        });
        if (apartments.length === 0) setNull(true);
    }
    if (idCategory && minPrice1 && maxPrice1 && search) {
      const apartmentsByCategory = await getApartmentByCategory(idCategory);
      apartments = apartmentsByCategory.data.filter(apartment => {
          const byPrice = apartment.price; // הנחתי שיש שדה כזה
          return (minPrice1 ? byPrice >= minPrice1 : true) && (maxPrice1 ? byPrice <= maxPrice1 : true);
      });
      if (apartments.length === 0) setNull(true);
  }
  // סינון לפי קטגוריה ומיטות
  else if (idCategory && min && max && search) {
      const apartmentsByCategory = await getApartmentByCategory(idCategory);
      apartments = apartmentsByCategory.data.filter(apartment => {
          const beds = apartment.bedsNumber; // הנחתי שיש שדה כזה
          return (min ? beds >= min : true) && (max ? beds <= max : true);
      });
      if (apartments.length === 0) setNull(true);
  }
  // סינון לפי מחיר ומיטות
  else if (minPrice1 && maxPrice1 && min && max && search) {
      const allApartments = await getAllApartments();
      apartments = allApartments.data.filter(apartment => {
          const byPrice = apartment.price; // הנחתי שיש שדה כזה
          const beds = apartment.bedsNumber; // הנחתי שיש שדה כזה
          return (minPrice1 ? byPrice >= minPrice1 : true) && (maxPrice1 ? byPrice <= maxPrice1 : true) &&
                 (min ? beds >= min : true) && (max ? beds <= max : true);
      });
      if (apartments.length === 0) setNull(true);
  }
      //סינון לפי עיר
      else if (idCity && search) {
        const apartmentsByCity = await getApartmentByCity(idCity);
        apartments = apartmentsByCity.data;

        if (apartments.length === 0) setNull(true);
      }
      //סינון לפי כמות מיטות
       else if (min && max && search) {
        const rangePrice = await getApartmentByRangeBed(min, max);
        apartments = rangePrice.data;
      } 
      //סינון לפי טווח מחירים
      else if(minPrice1 && maxPrice1 && search) {
        const rangeBeds = await getApartmentByRangePrice (minPrice1, maxPrice1);
        apartments = rangeBeds.data;
      }
      //סינון לפי קטגוריה
      else if (idCategory && search) {
        const apartmentsByCategory = await getApartmentByCategory(idCategory);
        apartments = apartmentsByCategory.data;

        if (apartments.length === 0) setNull(true);
      } 
      //הכל ללא סינון
      else {
        const allApartments = await getAllApartments();
        apartments = allApartments.data;
      }

      // סינון לפי כמות מיטות
      if (min || max) {
        apartments = apartments.filter(apartment => {
          const beds = apartment.bedsNumber; // הנחתי שיש שדה כזה
          return (min ? beds >= min : true) && (max ? beds <= max : true);
        });
      }
      // סינון לפי מחיר
      if (maxPrice1 || minPrice1) {
        apartments = apartments.filter(apartment => {
          const byPrice = apartment.price; // הנחתי שיש שדה כזה
          return (minPrice1 ? byPrice >= minPrice1 : true) && (maxPrice1 ? byPrice <= maxPrice1 : true);
        });
      }

      if (apartments.length === 0) {
        setList([]);
      } else {
        setList(apartments); 
      }
    };

    setSearch(false);
    setNull(false);
    finalApartments();
  }, [search]);

  const SelectedCity = (e) => {
    setIdCity(e.target.value); 
  }

  const SelectedCategory = (e) => {
    setIdCategory(e.target.value); 
  }

  const Search = () => {
    setSearch(true);
  }

  const saveMax = (e) => {
    setMax(e.target.value);
  }

  const saveMin = (e) => {
    setMin(e.target.value);
  }
  const saveMaxPrice = (e) => {
    setMaxPrice1(e.target.value);
  }
  const saveMinPrice = (e) => {
    setMinPrice1(e.target.value);
  }

  return (
    <>
      <div className="opening">
        <div id="search">
          <div className="cities" id="cit">
            <p className="p3">הכנס כמות מיטות</p>
            <input type="number" name="from"  className="bed" min={2} max={50} onChange={saveMin}></input>
            <>---</>
            <input type="number" name="to" className="bed" min={2} max={50} onChange={saveMax}></input>
          </div>

          <div className="cities" id="cit">
          <p className="p3">הכנס טווח מחירים </p>
            <input type="number" name="from" className="bed2" min={1000} max={10000} onChange={saveMinPrice}></input>
            <>---</>
            <input type="number" name="to" className="bed2" min={1000} max={10000} onChange={saveMaxPrice}></input>
          </div>

          <select name="cities1" className="cities" onChange={SelectedCity}>
            <option value=""> &#x25BD; בחר עיר</option>
            {city.map((y, index) => (
              <option value={y._id} key={index}>
                {y.cityName}
              </option>
            ))}
          </select>

          <select name="categories" className="cities" onChange={SelectedCategory}>
            <option value="">&#x25BD;   בחר קטגוריה</option> 
            {category.map((y, index) => (
              <option value={y._id} key={index}>
                {y.categoryName}
              </option>
            ))}
          </select>
         
          <button id="searchButton" className="home-to-go-button" onClick={Search}>חפש</button>
        </div>
      </div>
     
      <div>
        <div className="card-container">
          {list.length === 0 && <p id="noResult">לא נמצאו תוצאות!</p>}
          {Null && <p id="noResult">לא נמצאו תוצאות!</p>}
          {!Null && !Null && list.map((x, index) => (
            <Card key={index} apartment={x}></Card>
          ))}
        </div>
      </div>
    </>
  );
};
