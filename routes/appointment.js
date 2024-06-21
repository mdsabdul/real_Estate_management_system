var express = require("express");
var router = express.Router();
const {isLoggedIn} = require("../utils/auth");
const AppointmentSchema = require("../models/appointmentSchema")

  function verifyrole(req,res,next){
    if(req.user.role == "buyer"){
        next()
    }
    else{
        res.send("only buyer can make an appointment")
    }
  }
  router.get("/:pid",isLoggedIn,verifyrole,function(req,res,next){
    res.render("createappointment",{user:req.user,pid:req.params.pid})
  })



router.post("/:propertyid",isLoggedIn,verifyrole,async function(req,res,next){
try {
    const newappointment =new AppointmentSchema({ ...req.body,user:req.user._id,property:req.params.propertyid })
    newappointment.save()
    res.redirect("/user/allappointments");
} catch (error) {
    res.send(error)
}
})



module.exports = router