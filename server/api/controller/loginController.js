const exprees = require('express');
const router = exprees.Router();
const User = require('../models/usermodel');
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
    
       await User.findOne({email:req.body.email}).then((user)=>{
        if (user==null) {
            res.status(200).json('Giriş Başarısız')
        }else{
            const pass =  user.Password
       
              bcrypt.compare(req.body.Password, pass,  function(err, result) {
                 if (result) {
                    const token = jwt.sign({
                        muuid: pass,
                        memail: user.email,
                        cid: user.cid
                    }, 
                    'secret_key',
                    {
                        expiresIn :"2h"
                    }
                    )
                  res.status(200).json({message:'Giriş Başarılı','token':token});
                 }else if (!result){
                  res.status(200).json('Şifre Yanlış');
                 }else{
                  res.status(402).json(res.statusMessage);
                 }
              })
              
        }
       })
      
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = router