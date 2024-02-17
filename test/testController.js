const TeacherAttendance = require("../database/models/TeacherAttendance");
const { Error } = require("../services/Error")
const mongoose = require("mongoose");

const addAttendanceData = async(req)=>{
    const { month, data } = req.body;

    try {
        for (const { email, attendance } of data) {
            for (const dayAttendance of attendance) {
                for (const day in dayAttendance) {
                    const timeInHours = dayAttendance[day].timeInHours;
                    const startTime = new Date();
                    const endTime = new Date();

                    startTime.setMonth(month - 1, day); // Month is 0-indexed, day is as provided
                    startTime.setHours(9, 0, 0, 0); // Assuming a start time of 9:00 AM

                    // Calculate endTime based on timeInHours
                    endTime.setMonth(month - 1, day);
                    endTime.setHours(9 + parseInt(timeInHours), 0, 0, 0); // Adds timeInHours to start time

                    await TeacherAttendance.create({
                        email,
                        className: "Sample Class", // Placeholder, update as needed
                        classId: "SampleClassId", // Placeholder, update as needed
                        startTime,
                        endTime,
                        isCompleted: true // Assuming completion, update as needed
                    });
                }
            }
        }

        return {status:200,msg:"",data:{}}

        
    } catch (error) {
        throw error;
    }
}

const deleteAttendance = async(req)=>{
    try {
        if (mongoose.connection.readyState !== 1) {
            console.error("Not connected to the database.");
            return { status: 500, msg: "Database connection is not established." };
        }
    
        try {
            await mongoose.connection.db.dropCollection('teacher_attendances');
            console.log("Collection dropped");
            return { status: 200, message: "Test-data has been deleted successfully", data: {} };
        } catch (error) {
            console.error("Failed to delete the attendance collection:", error);
            // If the error is because the collection does not exist, you might want to handle it differently
            return { status: 500, msg: "Failed to delete the attendance collection", error: error.message };
        }

    } catch (error) {
        throw error;
    }
}

module.exports = {addAttendanceData, deleteAttendance};