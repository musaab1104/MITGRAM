const mongoose =require("mongoose")
const bcrypt = require("bcryptjs")

const StudentSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    confirm_password: {
        type:String,
        required:true,
    },
});

StudentSchema.pre("save",async function (next){
    if(this.isModified("password")){
         this.password =await bcrypt.hash(this.password,10)

         this.confirmpassword = undefined;
         
    }
   
    next();

});


const Signin = new mongoose.model("User", StudentSchema);  

module.exports = Signin;