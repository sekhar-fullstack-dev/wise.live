const mongoose = require('mongoose');

const teacherAttendanceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  className:{
    type: String,
    required: true,
  },
  classId:{
    type: String,
    required: true,
  },
  startTime:{
    type: Date,
    default: new Date(),
    required: true
  },
  endTime:{
    type: Date,
    default: new Date(),
    required: true
  },
  isCompleted:{
    type: Boolean,
    required: true,
    default: false
  }
},{collection:"teacher_attendances",timeStamps:true});


const TeacherAttendance = mongoose.model('TeacherAttendance', teacherAttendanceSchema);
module.exports = TeacherAttendance;