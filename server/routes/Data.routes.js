const Datacontrollers=require("../controllers/Data.controller")
module.exports =(app) =>{
    app.get("/Data", Datacontrollers.findAllData)
    app.get("/Data/:id", Datacontrollers.findData)
    app.post("/Data", Datacontrollers.createData)
    app.put("/Data/:id",Datacontrollers.updateData)
    app.delete("/Data/:id",Datacontrollers.deletData)
} 