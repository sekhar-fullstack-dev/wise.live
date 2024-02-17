const TeacherAttendance = require("../database/models/TeacherAttendance");

const enterClass = async(req)=>{
    try {
        const teacherAttendance = new TeacherAttendance({email:req.user.email, ...req.body});
        const result = await teacherAttendance.save();
        if (result){
            return {status:200, msg:"Event marked successfully", data:{id:result.id}}
        }
        else{
            return {status:500, error:"Couldn't mark the event",data:{}};
        }
    } catch (e) {
        throw e;
    }
}

const exitClass = async(req)=>{
    try {
        const result = await TeacherAttendance.findByIdAndUpdate(req.body.attendanceId,{isCompleted:true, endTime:new Date()})
        if (result){
            return {status:200, msg:"Event marked successfully", data:{}}
        }
        else{
            return {status:500, error:"Couldn't mark the event",data:{}};
        }
    } catch (e) {
        throw e;
    }
}

const getCurrentMonthDateRange = async() => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // Set to the last moment of the month
        return { startOfMonth, endOfMonth };
    } catch (e) {
        throw e;
    }
  }

const attendenceData = async(req)=>{
    try {
        const { startOfMonth, endOfMonth } = getCurrentMonthDateRange();
        const result = await TeacherAttendance.aggregate([
            {
              $match: {
                createdAt: { $gte: startOfMonth, $lte: endOfMonth } // Filter documents created this month
              }
            },
            {
              $group: {
                _id: "$email", // Group by email
                totalCheckedInTime: {
                  // Sum the difference between endTime and startTime for each document
                  $sum: {
                    $subtract: ["$endTime", "$startTime"]
                  }
                },
                docs: { $push: "$$ROOT" } // Optional: Include all documents in the group
              }
            },
            {
              $addFields: {
                email: "$_id", // Add the email field back for convenience
                totalCheckedInTimeInHours: {
                  // Convert totalCheckedInTime from milliseconds to hours
                  $divide: ["$totalCheckedInTime", 1000 * 60 * 60]
                }
              }
            },
            {
              $project: {
                _id: 0, // Exclude the _id field
                email: 1,
                totalCheckedInTime: 1,
                totalCheckedInTimeInHours: 1,
                // Include any other fields you want to return
              }
            }
          ]);
        const transformedResult = result.reduce((acc, curr) => {
        acc[curr.email] = {
            totalCheckedInTime: curr.totalCheckedInTime,
            totalCheckedInTimeInHours: curr.totalCheckedInTimeInHours,
        };
        return acc;
        }, {});
        return {status:200,msg:"",data:{...transformedResult}}
    } catch (e) {
        throw e;
    }
}

module.exports = {enterClass, exitClass, attendenceData}