
import '../style.css';
import { navigate, Outlet, useNavigate } from "react-router";


export const Card = ({ apartment }) => {
    const navigate = useNavigate();

const details=()=>{
    const it =apartment._id
    navigate(`MoreDetails/${it}`)
}
  return (
    <div className="card"
    //  onClick={() => show(apartment._id)}
    >
      <div className='image' 
       
      style={{backgroundImage:`url(/${apartment.picture[0]})`}}>
      </div>
      <div className='words'>
        <h1 className='h41'>{apartment.apartamaentName}</h1>
        <h3 className='h51'>{apartment.descripting}</h3>
       
        <p className='p1'>{`${apartment.address}, ${apartment.city.cityName}` }</p>
        <p className='p1'>{`י${apartment.bedsNumber}    מיטות`}</p>
        <p className='p1'>  ₪ {apartment.price} </p>
        <button  onClick={details} className='home-to-go-button' id='det'>פרטים נוספים</button>
      </div>
       
    </div>
  );
};
