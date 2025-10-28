const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    //name
    name:{
        type:String,
        required:true,
        minLength:2, 
        maxLength:50
    },
    //email
    email:{
        type:String,
        required:true,
        unique:true
        //validate HW
    },

    //password
    password:{
        type:String,
        minLength:6,
        maxLength:30,
        required:true
    },

    //age
    age:{
        type:Number,
        min:10,
        max:100
    },

    //address
    address:{
        //locality
        locality:{
            type:String
        },
        //city
        city:{
            type:String,
        },
        //country
        country:{
            type:String
        }
    },
    //zipcode
    zipcode:{
        type:Number
    },

    //role
    role:{
        type:String,
        enum:["user", "admin", "superadmin"]
    }
},
{
    timestamps:true
})

//event listener 
userSchema.pre('save', async function(next){
    //create
    //signup => password => encrypt => database
    //salt is the string that is added to the password to make it even more impossible to decrypt it

    //1. internal way to create salt 
    const salt = await bcrypt.genSalt(10);
    //2. using a custom salt
    // const salt = "shishirtoldmetouseacustomstring"

    const hashPassword= await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    return next();
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}
//this bcrypt.compare is a function provided to us to compare plain password entered by user at the time of login with the password that is saved in the db

//bcrypt return true if password matches and false otherwise


const Users = mongoose.model(
    "User",
    userSchema
)

module.exports = Users;