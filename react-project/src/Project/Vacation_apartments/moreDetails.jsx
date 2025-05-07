import { useParams } from 'react-router';
import '../style.css';
import { useEffect, useState,React } from 'react';
import { getApartmentById } from '../api';
import EmailLink from './EmailLink';
export const MoreDetails = () => {
    const {it} = useParams();
    const[thisApartment,setthisApartment]=useState();
    useEffect(() => {
        getApartmentById(it)
          .then(y => {
            setthisApartment(y.data);
          })
          .catch(err => {
            console.log(err);
          });
          console.log(thisApartment)
      });
      const [currentIndex, setCurrentIndex] = useState(0);

      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % thisApartment.picture.length);

      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
          (prevIndex - 1 + thisApartment.picture.length) % thisApartment.picture.length
        );
      };
return <>
{thisApartment &&
<div id='con'>
      <div id='bigImage'  style={{backgroundImage:`url(/${thisApartment.picture[currentIndex]})`}}>
      <button id='left' onClick={handlePrev} disabled={thisApartment.picture.length === 0}>
        &#10094; 
      </button>
    
      <button id='right' onClick={handleNext} disabled={thisApartment.picture.length === 0}>
        &#10095; 
      </button>
      </div>
{/* <div id='bigImage'  style={{backgroundImage:`url(/${thisApartment.picture})`}}></div> */}
<div id='allDetails'>
<h1 id="p444">{thisApartment.apartamaentName}</h1>
<h3 className='p41'>{thisApartment.descripting}</h3>
<p className='p41'>{`${thisApartment.address} ,${thisApartment.city.cityName}` }</p>
<p className='p41'>{`י ${thisApartment.bedsNumber}מיטות `}</p>
<p className='p41'>{`₪ ${thisApartment.price}`}</p>

{
  thisApartment.moreThings.length > 0 && 
  <p className='p41'>
    {thisApartment.moreThings.map((item, index) => (
      <span key={index}>{item}*</span>
    ))}
  </p>
}

<h3 className='p41'>ליצירת קשר:</h3>
<EmailLink className="p41" email={thisApartment.adverteiser.email} subject="Inquiry about your service" />
<p className='p41' id='p44'>{thisApartment.adverteiser.phone}</p>
{thisApartment.adverteiser.morePhone && <p className='p41'>{thisApartment.adverteiser.morePhone}</p>
}

           

</div>
</div>
}
</>
}
