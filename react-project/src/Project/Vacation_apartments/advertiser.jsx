import { addCategory, addCity, getApartmentByAdverteiser } from "../api";
import { AdveristerCard } from "./AdveristerCard";
import { useState,useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import AddHomeIcon from '@mui/icons-material/AddHome';
import Swal from "sweetalert2";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { navigate, Outlet, useNavigate, useParams } from "react-router";


import CategoryIcon from '@mui/icons-material/Category';

export const Advertiser = () => {
  const navigate = useNavigate();

    const[divOpen,setdivOpen]=useState(false)
    const [list, setList] = useState([]);


    const [addCities, setaddCities] = useState({
        cityName: ''
        
    });
    const [addCategories,setaddCategories] = useState({
        categoryName:''
    });
    const onChangeCity =(e) =>{
  
        const { name, value } = e.target;
        setaddCities({ ...addCities, [name]: value });
    };
    const onChangeCategory =(e) =>{
  
        const { name, value } = e.target;
        setaddCategories({ ...addCategories, [name]: value });
    };
 
    //הוספת עיר
    const addingCity =(e)=>{
       
          

        e.preventDefault();
       const city ={
        cityName: addCities,
       }
       addCity(city.cityName)
       .then(x=>{
        console.log(x)
        Swal.fire({
          icon: "success",
          title: "נוסף בהצלחה",
          timer: 2000
      }); 
      setOpenCity(false)
          })
       .catch(err => {
        if(err.response.data.error){
         Swal.fire({
          text: err.response.data.error,
          icon: "info"
      });
    }
        else{
        Swal.fire({
          text: "עלייך להתחבר/להירשם",
          icon: "info"
      }); 
    }   });    
       }
       //הוספת קטגוריה
       const addingCategory =(e)=>{
        
        e.preventDefault();
       const category ={
        categoryName: addCategories,
       }
       addCategory(category.categoryName)
       .then(x=>{
        console.log(x)
        Swal.fire({
          icon: "success",
          title: "נוסף בהצלחה",
          timer: 2000
      });
      setOpenCategory(false)
    })
       .catch(err => {
        if(err.response.data.error){
        Swal.fire({
          text: err.response.data.error,
          icon: "info"
      });
    }
        else{
        Swal.fire({
          text: "עלייך להתחבר/להירשם",
          icon: "info"
      });
    }
    });    
       }
       const [err, seterr] = useState(null)
       useEffect(() => {
        
        getApartmentByAdverteiser(localStorage.getItem('_id'))
        
          .then(y => {
            console.log("y",y)
            setList(y.data);
          })
          .catch(err => {
            seterr("עלייך להתחבר/להירשם")
            console.log(err);

          });
      }, []);
    const getMyApartments =()=>{
        if(err){
            alert(err)
            return;
        }
        if(divOpen==false)
          setdivOpen(true)
        else
        setdivOpen(false)

    }
    const [openCity,setOpenCity] =useState(false);
   const addNewCity =()=>{
    setOpenCity(true)
   }
   const closeCity =()=>{
    setOpenCity(false)
   }
   const [openCategory,setOpenCategory] =useState(false);

   const addNewCategory =()=>{
    setOpenCategory(true)
   }
   const closeCategory =()=>{
    setOpenCategory(false)
   }
  
    const addNewApartment =()=>{
      navigate('Add1')
     }
   

    return<>
    <div id="big">
    <div id="buttons">
      <div className="advetisterButton">
      <HomeIcon  color="primary" onClick={getMyApartments} sx={{ fontSize: 100}} />
      <p>לדירות שלי</p>
      </div>
      <div  className="advetisterButton" >
      <CategoryIcon color="secondary" sx={{ fontSize: 100 }}  onClick ={addNewCategory}></CategoryIcon>
      <p>הוסף קטגוריה</p>
      </div>
      <div className="advetisterButton" >
      <LocationCityIcon sx={{ fontSize: 100 ,color: '#FF69B4'}} onClick ={addNewCity}></LocationCityIcon>
      <p>הוסף עיר</p>
      </div>
      <div className="advetisterButton" >
      <AddHomeIcon  sx={{ fontSize: 100, color: 'orange' }} onClick ={addNewApartment}></AddHomeIcon>
      <p>הוסף דירה</p>
      </div>
    </div>
    <div id="many">
    {/* הוספת עיר */}
    {openCity && 
    <div className="divA" id="acity">
    <button onClick={closeCity} className="x" >X</button><br></br><br></br>
    <div class="signup__field">
      <input class="inputA" type="text" name="cityName"  required onChange={onChangeCity}  value={addCities.cityName} />
      <label class="signup__label" for="password">הכנס  שם עיר</label>
    </div>
    <button  className="home-to-go-button" onClick={addingCity}>הוסף </button>
    </div>
    }
    {/* הוספת קטגוריה */}
   {openCategory &&
   <div className="divA" id="acategory">
        <button  onClick={closeCategory} className="x">X</button><br></br><br></br>

     <div class="signup__field">
      <input class="signup__input" type="text" name="categoryName" id="password" required onChange={onChangeCategory}  value={addCategories.categoryName} />
      <label class="signup__label" for="password">הכנס שם קטגוריה</label>
    </div>
    <button  className="home-to-go-button" onClick={addingCategory}>הוסף</button>

    </div>
   }
   
     {divOpen &&list.length>0 && 
      <div className="card-container">
   
      {list.length==0 &&  <p id="noResult">לא נמצאו תוצאות!</p>}
       
      {list.map((x, index) => (
        <AdveristerCard key={index} apartment={x}></AdveristerCard>
      ))}
    </div>
}
</div>
      </div>
    </>

}
