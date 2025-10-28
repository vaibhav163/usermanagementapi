const express = require("express")
const Users = require("../model/user.model")
const router = express.Router()
const {createToken} = require("../auth/jwt.auth")

router.get("/users", async (req,res) => {
    const users = await Users.find()
    res.json(users)
})

router.post("/register", async (req,res) => {
    const data = req.body;

    //mongoose way
    const userData = await Users.create(data)

    //Oop way
    // const userData = new Users(data)
    // userData.save()

    res.json({
        message:"User create successfully",
        userData
    })
})

router.post("/login", async (req,res) => {
    const {email,password} = req.body

    try{
        const data = await Users.findOne({
            email:email
        })

        if(!data){
            return res.json({
                message:"user not found"
            })
        }
        const token = createToken(data)
        console.log(token)

        if(!data.comparePassword(password)){
            res.status(404).send("Password is incorrect")
        }

        res.json({
            message:"Login Successfully",
            data,
            token
        })
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

router.get("/getUser/:username", async (req,res) => {
    const {username} = req.params
    const userData = await Users.findOne({
        username:username
    })

    if(!userData){
        return res.status(404).send("User Not Found")
    }
    
    res.json({
        message:"User Found",
        userData
    })

})

router.get("/user/:id", async (req,res) => {
    const id = req.params.id
    try{
        const userData = await Users.findById({
            _id:id
        })

        if(userData.length === 0){
            return res.status(404).send("User Not Found")
        }

        res.json({
            message:"User Found By Id Successfully",
            userData
        })
    }
    catch(err){
        return res.status(404).send(err.message)
    }
})

router.delete("/deleteUser/:id",async(req,res) => {
    const user = await Users.findByIdAndDelete(req.params.id)
    res.json({
        message:"User Deleted",
        user
    })
})

//write route for adult
router.get("/adult", async (req,res) => {
    try{
    const adultUsers = await Users.find({
        age:{
            $gt:55
        }
    })
    if(adultUsers.length === 0){
        res.status(404).send("No Adult More Than 50")
    }
    res.json({
        message:"These all are adults",
        adultUsers
    })
    }
    catch(err){
        return res.status(404).send(err.message)
    }

})

router.get("/userwithadmin",async(req,res) => {
    try{
        const userData = await Users.find({
            role:{
                $in:["admin"]
            }
        })

        if(userData.length === 0){
            return res.status.apply(404).send("No user with admin role")
        }

        res.json({
            message:"These are Admins list",
            userData
        })

    }
    catch(err){
        return res.status(404).send(err.message)
    }
})


//user with role admin and age 29
router.get("/roleage",async(req,res) => {
    try{
        const userData = await Users.find({
            $and:[
                {age:29},
                {role:"admin"}
            ]
        })

        if(userData.length === 0){
            return res.status(404).send("No Data with age 29 and admin role")
        }

        res.json({
            userData
        })
    }
    catch(err){
        return res.status(404).send("err.message")
    }
})

router.put("/updateOne",async(req,res) => {
    const {username,newEmail} = req.body;
    try{
        const userData = await Users.findOneAndUpdate(
            //1.filter condition
            {
                username:username
            },
            //2.update new info
            {
                $set:{
                    email:newEmail
                }
            },
            {
                new:true
            }
        )

        if(!userData){
            return res.status(404).send("User not found")
        }
        res.json({
            message:"Email changed Successfully",
            userData
        })
    }
    catch(err){
        return res.status(404).send(err.message)
    }
})

router.put("/findById/:id",async(req,res) => {
    const id = req.params.id
    try{
        const userData = await Users.findByIdAndUpdate(
            id,
            {
                role:"admin"
            },
            {
                new:true
            }
        )

        if(!userData){
            return res.status(404).send("User not found")
        }

        res.json({
            message:"Role Updated Successfully",
            userData
        })
    }
    catch(err){
        return res.status(404).send(err.message)
    }
})

router.delete("/deleteByEmail", async (req,res) => {
    const email = req.body.email
    try{
        const userData = await Users.deleteOne({
            email:email
        })

        res.json({
            message:"User Delete Successfully",
            userData
        })
    }
    catch(err){
        return res.status(404).send(err.message)
    }
})

router.post("/signUp",async (req,res) => {
const data = req.body
const userData = await Users.create(data)
console.log(data)
res.json({
    message:"Sign Up Success",
    userData
})
})


router.post("/login",(req,res) => {
    const data = req.body;
    res.json({
        message:"Login Successfully",
        data,
    })
})

router.get("/findUser/:id", async(req,res) => {
    const id = req.params.id
    const userData = await Users.findById({
        _id:id
    })
    res.json(userData)
})


router.get("/greaterThan/:age", async (req,res) => {
    const age = Number(req.params.age);
    try{
        const userData = await Users.aggregate(
            [
                //stage 1
                {
                    $match:{
                        age:{
                            $gt:age
                        }
                    }
                }
            ]
        )
        res.status(200).json(userData)
    }
    catch(err){
        return res.status(404).send(err.message)
    }
})

router.get("/getRoles",(req,res) => {

})

router.get("/agewisesort",async(req,res) => {
    const userData = await Users.aggregate([
        {
            $match:{
                age:{
                    $gt:18
                }
            }
        },
        {
            $sort:{
                age:-1
            }
        }
    ])
})



// LlaYAH7KNoHEnL2M

module.exports = router