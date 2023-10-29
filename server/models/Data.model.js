const mongoose=require("mongoose")
const DataSchema=new mongoose.Schema({
name:{
    type : String,
    required:[ true, "le nom est obligatoire"]
},
Email:{
    type:String,
    required:[ true, "Donner votre Email"]
},
 post:{
    type:String,
    required:[ true, "Donner votre post"]
 },
 Passe:{
    type:String,
    required:[ true, "Donner un autre mot de passe"]
 },
 valid:{
    type:Boolean
 }
},{timestamps:true})
module.exports = mongoose.model('Data', DataSchema);