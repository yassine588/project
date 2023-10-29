const Demandecontroller=require("../controllers/Demande.controller")
module.exports =(app) =>{
    app.post("/Demande",Demandecontroller.createData)
    app.get("/Demande", Demandecontroller.findAllData)
    app.get("/Demande/:id", Demandecontroller.findData)
    app.put("/Demande/:id",Demandecontroller.updateData)
    app.delete("/Demande/:id",Demandecontroller.deletData)
}