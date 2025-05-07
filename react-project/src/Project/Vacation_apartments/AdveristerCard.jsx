
import '../style.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { navigate, Outlet, useNavigate, useParams } from "react-router";
import swal from "sweetalert2";


import { deleteApartment } from '../api';


export const AdveristerCard = ({ apartment }) => {


  const navigate = useNavigate();

   const deleteApart =(a)=>{
    deleteApartment(a._id,localStorage.getItem('_id'))
     .then(x=>{
      swal.fire({
        icon: "success",
        title: "הדירה נמחקה!",
        timer: 2000
    });
     })
     .catch(err => {
      console.log(err);
     })

   }
   const editApart =(it)=>{
    navigate(`Edit/${it._id}`)

   }

  return (
    <div className="card"
    //  onClick={() => show(apartment._id)}
    >
      <div className='image' 
       
      style={{backgroundImage:`url(/${apartment.picture[0]})`}}>
      </div>
      <div className='words'>
        <h1 className='p1'>{apartment.apartamaentName}</h1>
        <h3 className='p1'>{apartment.descripting}</h3>
       
        <p className='p1'>{`${apartment.address} ,${apartment.city.cityName}` }</p>
        <p className='p1'>{`י${apartment.bedsNumber} מיטות` }</p>
        <p className='p1'>₪  {apartment.price}</p>
        <DeleteForeverIcon  onClick={() => deleteApart(apartment)}></DeleteForeverIcon>
        <EditIcon id="edit" onClick={() => editApart(apartment)}></EditIcon>

      </div>
       
    </div>
  );
};
