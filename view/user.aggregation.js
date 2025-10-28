// const express= require('express');
// const router= express.Router();
// const User= require('../model/user.module');
// router.get('/greaterthan.:age',async(req,res)=>{
//     const age= parseInt(req.params.age);
//     const users= await User.aggregate([
//         {$match: { age: { $gt: age } } }]);
//     res.json(users);
// })

// module.exports=router;