import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
 categoryName:{
    type:String,
    require:true
 }
 ,
 arrApartments:{
   type:[mongoose.Schema.Types.ObjectId],
  ref:"Apartment"
}
})
export default mongoose.model('Category',categorySchema);