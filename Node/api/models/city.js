import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        require: true, 
    }
    ,
    arrApartments:{
        type:[mongoose.Schema.Types.ObjectId],
       ref:"Apartment"
     }
        
});

export default mongoose.model('City', citySchema);