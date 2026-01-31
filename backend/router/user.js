const { Router } = require("express");

const router=Router()

const usuarios=["admin","user"]

router.get('/',(req,res)=>{
    res.json({
        msg:'hola que tal ',
        data:usuarios
    })
})


module.exports=router;