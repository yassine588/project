const mongoose=require("mongoose")
const DemandeSchema=new mongoose.Schema({
   solde:{
       type : Number,
       required:[ true, "votre solde insufisant"]
   },
   DateD:{
       type:Date,
       required:[ true, "donner une autre Date"]
   },
    DateFt:{
       type:Date,
    },
    Numero:{
       type: Number,
    },
    Motif:{
       type:String
    },
    ID:{
      type:String
    }
   },{timestamps:true})
   module.exports = mongoose.model('demande', DemandeSchema)