const express =require("express");
const app=express();
const Router = require("./view/user.routes")
const port=process.env.PORT;
const dotenv=require('dotenv');
dotenv.config();
app.use(express.json())


// const mongoose = require('mongoose');
// const uri = "mongodb+srv://vaibhavsinghrajput4567_db_user:cdbSDIbub7pXGh33@cluster1.1wxpvgg.mongodb.net/?appName=Cluster1";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);

const DB_URI=process.env.DB_URI;
const mongoose = require('mongoose');
const uri = DB_URI;

mongoose.connect(uri)
.then(()=>console.log("connected to DB"))
.catch(err=>console.error(err.message))


// const client = new MongoClient(uri, {
//   tls: true,
//   tlsAllowInvalidCertificates: false,
//   serverApi: ServerApiVersion.v1
// });



// app.use("/",router)
// mongoose.connect('mongodb://localhost:27017/usermanagement')
// .then(()=>{
//     console.log("connected to db")
// })
// .catch((err)=>{
//     console.log(err.message);
// })
// app.post('/signup',(req,res)=>{
//     const data = req.body;
//     res.json({
//         message:"user signed up successfully",
//         data
//     })

// })
// app.post('/login',(req,res)=>{
//     const data=req.body;
//     res.json({
//         message:"user logged in successfully",
//         data
//     })
// })
// app.get('/users', (req, res) => {
//     const data = {vaibhav: {email: "vaibhav@example.com", age: 25}}.find();
//     res.json({
//         message: "All users fetched successfully",
//         data
//     });
//     console.log(data);
// });
// app.get('/users/:id',  (req, res) => {
    
//     const data =  User.findById(req.params.id);
//     res.json({
//         message: "User fetched successfully by ID",
//         data
//     });
//     console.log(data);
// });
app.use(Router)
app.get("/",(req,res)=>{
    res.send("welcome to usermanagement api")
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})