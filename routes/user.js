var express = require('express');
var router = express.Router();
const appointmentSchema = require("../models/appointmentSchema")
const propertySchema = require("../models/propertySchema")
const UserSchema = require("../models/userschema")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { isLoggedIn } = require("../utils/auth")
passport.use(UserSchema.createStrategy());
/* GET home page. */
router.get('/',async function (req, res, next) {
  try {
    const properties = await propertySchema.find()
    res.render("index",{properties:properties,user:req.user})
  } catch (error) {
    res.send(error)
  }
 
});

router.post("/current", isLoggedIn, function (req, res, next) {
  res.send(req.user)
})

router.post("/register", async function (req, res, next) {
  try {
    const { name, email, password, role } = req.body
    const newuser = new UserSchema({ name, email, role })
    await UserSchema.register(newuser, password)
    res.redirect("/user/login")
  } catch (error) {
    res.send(error)
  }
})
router.get("/register", function (req, res, next) {
  res.render("register",{user:req.user})
})
router.get("/login", function (req, res, next) {
  res.render("login",{user:req.user})
})
router.post("/login", passport.authenticate("local"),
  function (req, res, next) {
    res.redirect("/user/profile");
  });

  router.get("/allappointments",async function(req,res,next){
    try {
     const newappointment =await appointmentSchema.find()
     console.log(newappointment);
     res.render("allappointments",{newappointment:newappointment,user:req.user})
    } catch (error) {
     res.send(error)
    }
    })

//deleteproperty
    router.get("/delete/:pid",isLoggedIn, async function(req,res,next){
      const user = req.user
      try {
       if(user.role === "owner" ){
          await propertySchema.findByIdAndDelete(req.params.pid)
       }
          res.send("only owner can delete property")
       
      } catch (error) {
          res.send(error)
      }
      })


router.get("/profile", async function(req,res,next){
try {
  const properties = await propertySchema.find()
  res.render("profile",{properties:properties,user:req.user})
} catch (error) {
  res.send(error)
}

})



router.get("/logout", function (req, res, next) {
  req.logOut(() => {
    res.redirect("/user/login")
  })
})
module.exports = router;
