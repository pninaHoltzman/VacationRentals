import mongoose from "mongoose"


const advertiserSchema = new mongoose.Schema({
   email:{
    type:String,
    require:true,
    maxLength:40,
    minLength:11,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
 
    //לטפל בזה שיהיה יחודי
   },
   password:{
   type:String,
   require:true,
   },
   phone:{
    type:String,
    require:true,
    maxLength:11,
    minLength:9
 
   },
   morePhone:{
    type:String,
    require:false
   },
   arrApartments:{
      type:[mongoose.Schema.Types.ObjectId],
     ref:"Apartment"
   }
})
export default mongoose.model('Advertiser', advertiserSchema)