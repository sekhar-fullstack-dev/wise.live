const express = require('express');
const { Error } = require('../services/Error');
const { addAttendanceData, deleteAttendance } = require('./testController');
const { authenticateBasicAuth } = require('../services/authServices');
const testRoute = express.Router();

testRoute.post('/addAttendanceData',authenticateBasicAuth, async(req, res)=>{
    try {
        const response = await addAttendanceData(req);
        if(response){
            res.status(200).send({status:200,error:"",msg:"test Successful",data:{}})
        }
        else{
            res.status(500).send({status:500,error:"test unsuccessful",msg:"",data:{}})
        }
    } catch (e) {
        Error(res, e);
    }
})

testRoute.get('/deleteTestData',authenticateBasicAuth, async(req, res)=>{
    try {
        const response = await deleteAttendance(req);
        if(response){
            res.status(200).send({status:200,error:"",msg:"test Successful",data:{}})
        }
        else{
            res.status(500).send({status:500,error:"test unsuccessful",msg:"",data:{}})
        }
    } catch (e) {
        Error(res, e);
    }
})

module.exports = testRoute;