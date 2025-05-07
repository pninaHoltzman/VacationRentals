import mongoose, { Types } from "mongoose";

const apartmentSchema = new mongoose.Schema({
   apartamaentName:{
    type:String,
    required:false
   },
   descripting:{
     type:String,
     required:true
   },
   picture:{
    type:[String],
    required:true
   },
   category:{
    type:mongoose.Types.ObjectId,
    ref:'Category',
    required:true
   },
   city:{
     type:mongoose.Types.ObjectId,
     ref:'City',
     required:true
   },
   address:{
    type:String,
    required:true
   },
   bedsNumber:{
    type:Number,
    required:true
   },
   moreThings:{
    type:[String],
    required:true
   },
   price:{
     type:Number,
     required:true
   },
   adverteiser:{
   type:mongoose.Types.ObjectId,
   ref:'Advertiser',
   required:true
   }

})
export default mongoose.model('Apartment',apartmentSchema);