const express = require('express');
const { authenticateBasicAuth, decodeBasicAuth } = require('../services/authServices');
const { Error } = require('../services/Error');
const { registerUser, loginUser } = require('../controllers/authController');
const authRoute = express.Router();

authRoute.post('/register', authenticateBasicAuth, async(req, res) => {
    try {
        if(req.auth){
            const response = await registerUser(req);
            if(response){
                res.status(200).send(response);
            }
            else{
                res.status(500).send({status:500,error:"Something went wrong"})
            }
        }
    } catch (e) {
        Error(res, e);
    }
});

authRoute.post('/login', async(req, res)=>{
    try {
        const response = await loginUser(req);
        if(response){
            res.status(200).send(response);
        }
        else{
            res.status(500).send({status:500,error:"Something went wrong"})
        }
    } catch (e) {
        Error(res, e);
    }
})

module.exports = {authRoute};
