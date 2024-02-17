const Error = async(res, e)=>{
    try {
        res.status(500).send({status:500, message:"", error:e, data:{}});
    } catch (e) {
        res.status(500).send("something went wrong");
    }
}

module.exports = {Error}