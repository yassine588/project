const Data=require("../models/Data.model")
module.exports.createData=(req,res)=>{
Data.create(req.body)
.then(
    myData=>{
        console.log(myData)
        res.status(200).json({myData})
    }
)
.catch(err=>{res.status(404).json(err)})
}
module.exports.updateData=(req,res)=>{
    Data.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(newupdate=>{
        res.status(200).json(newupdate)
    })
    .catch(err=>{res.status(404).json(err)})
}
module.exports.findAllData=(req,res)=>{
Data.find()
.then(allData=>{
    res.status(200).json(allData)
})
.catch(err=>{res.status(404).json(err)})
}
module.exports.findData=(req,res)=>{
    Data.findOne({_id:req.params.id})
    .then(myData=>{
        res.status(200).json(myData)
    })
    .catch(err=>{res.status(404).json(err)})
 }
 module.exports.deletData=(req,res)=>{
    Data.findByIdAndDelete({_id:req.params.id})
    .then(delData=>{
        res.status(200).json(delData)
    })
    .catch(err=>{res.status(404).json(err)})
    }