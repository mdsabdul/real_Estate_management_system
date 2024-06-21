const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connection Done!")).catch((error)=>console.log(error))