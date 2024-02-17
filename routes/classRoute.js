const express = require('express');
const { Error } = require('../services/Error');
const { enterClass, exitClass, attendenceData } = require('../controllers/classController');
const { authenticateUser } = require('../services/authServices');
const classRoute = express.Router();

classRoute.post('/enter',authenticateUser, async(req, res)=>{
    try {
        const response = await enterClass(req);
        if (response){
            res.status(200).send(response);
        }
        else{
            res.status(500).send({status:500, error:"Something went wrong",data:{}})
        }
    } catch (e) {
        Error(res, e);
    }
})

classRoute.post('/exit',authenticateUser, async(req, res)=>{
    try {
        const response = await exitClass(req);
        if (response){
            res.status(200).send(response);
        }
        else{
            res.status(500).send({status:500, error:"Something went wrong",data:{}})
        }
    } catch (e) {
        Error(res, e);
    }
})


classRoute.post('/attendanceData',authenticateUser, async(req, res)=>{
    try {
        const response = await attendenceData(req);
        if (response){
            res.status(200).send(response);
        }
        else{
            res.status(500).send({status:500, error:"Something went wrong",data:{}})
        }
    } catch (e) {
        Error(res, e);
    }
})

module.exports = classRoute;