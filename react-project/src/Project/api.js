import axios from "axios"

const baseUrl = `http://localhost:3001`
export const getAllApartments = () => {
    return axios.get(`${baseUrl}/apartment/getAllApartments`)
}
export const SignupUser = (newUser) => {
    // debugger
    console.log(newUser);
    return axios.post(`${baseUrl}/adverteiser/signup`,newUser)
}
export const LoginUser = (user) => {
    // debugger
    console.log(user);
    return axios.post(`${baseUrl}/adverteiser`,user)
}
export const getCity = () => {
    
    return axios.get(`${baseUrl}/city`)
}
export const getApartmentByCity = (id) => {
   return axios.get(`${baseUrl}/apartment/getApartmentByCity/${id}`)
}
export const getAllCategories = () => {
    return axios.get(`${baseUrl}/category`)
}
export const getApartmentByCategory = (id) => {
    return axios.get(`${baseUrl}/apartment/getApartmentByCategory/${id}`)
 }
 export const getApartmentById = (id) =>{
    return axios.get(`${baseUrl}/apartment/getApartmentById/${id}`)

 }
 export const addCity =(cityName) =>{
    console.log(cityName)
    const token = {
                 Authorization: `Bearer ${localStorage.getItem('token')}`
            }
    
      return axios.post(`${baseUrl}/city/add`, cityName, { headers: token })
 }
 export const addCategory =(categoryName) =>{
    console.log(categoryName)
    const token = {
                 Authorization: `Bearer ${localStorage.getItem('token')}`
            }
    
      return axios.post(`${baseUrl}/category`, categoryName, { headers: token })
 }
 export const getApartmentByAdverteiser =(id) =>{
    const token = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
   }

return axios.get(`${baseUrl}/apartment/getApartmentByAdverteiser/${id}`, { headers: token })
 }
 export const deleteApartment=(id,idA) =>{
    const token = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
   }

return axios.delete(`${baseUrl}/apartment/${id}/${idA}`, { headers: token })
 }

 export const updateApartment=(id,idA,apartmentData) =>{
    console.log("apiapartment",apartmentData);
return axios.patch(`${baseUrl}/apartment/${id}/${idA}`,apartmentData)
 }
 export const getApartmentByRangePrice=(min,max)=>{
    return axios.get(`${baseUrl}/apartment/getApartmentByRangePrice/${min}/${max}`)
 }
 export const getApartmentByRangeBed=(min,max)=>{
    return axios.get(`${baseUrl}/apartment/${min}/${max}`)
 }
 export const addApartment=(newApartment)=>{
   const token = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
 }
    return axios.post(`${baseUrl}/apartment`,newApartment, { headers: token})
 }