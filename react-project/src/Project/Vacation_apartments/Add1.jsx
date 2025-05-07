import React, { useState, useEffect } from 'react';
import { addApartment, getAllCategories, getApartmentById, getCity, updateApartment } from '../api';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export const Add1 = () => {
  const navigate = useNavigate();
  const [thisApartment, setThisApartment] = useState(null);
  const [apartamaentName, setApartmentName] = useState('');
  const [descripting, setDescripting] = useState('');
  const [picture, setPicture] = useState([]);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [bedsNumber, setBedsNumber] = useState('');
  const [moreThings, setMoreThings] = useState([]);
  const [price, setPrice] = useState('');
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // קבלת רשימת הערים
    getCity()
      .then((y) => {
        setCities(y.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // קבלת רשימת הקטגוריות
    getAllCategories()
      .then((z) => {
        setCategories(z.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apartmentData = {
      apartamaentName,
      descripting,
      picture,
      category,
      city,
      address,
      bedsNumber,
      moreThings,
      price,
      adverteiser: localStorage.getItem('_id'),
    };
    console.log("apartmentData", apartmentData)
    // קריאה לעדכון הדירה
    addApartment(apartmentData)
      .then(e => {
        console.log('Apartment updated successfully:', e);
        Swal.fire({
          icon: "success",
          title: "הדירה נוספה בהצלחה!! ",
          timer: 2000
        });
        navigate('/Advertiser')
      })
      .catch(error => {
        console.error('Error updating apartment:', error);
        Swal.fire({
          icon: "error",
          text: "שגיאה בהוספת הדירה!",
        });
      });
  };



  return (
    <div className='all1'>
      <form onSubmit={handleSubmit} className="apartment-form">
        <div className="form-group">
          <label>שם הדירה</label>
          <input
            type="text"
            value={apartamaentName}
            onChange={(e) => setApartmentName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>תיאור הדירה</label>
          <textarea
            value={descripting}
            onChange={(e) => setDescripting(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>תמונה</label>
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value.split(','))}
            required
          />
        </div>

        <div className="form-group">
          <label>קטגוריה</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">בחר קטגוריה</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>עיר</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">בחר עיר</option>
            {cities.map((cityItem) => (
              <option key={cityItem._id} value={cityItem._id}>
                {cityItem.cityName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>כתובת</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>מספר מיטות</label>
          <input
            type="number"
            value={bedsNumber}
            onChange={(e) => setBedsNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>דברים נוספים</label>
          <input
            type="text"
            value={moreThings}
            onChange={(e) => setMoreThings(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>מחיר</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">הוסף דירה</button>
      </form>
    </div>
  );
};
