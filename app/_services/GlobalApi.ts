import axios from "axios"

const GetAllGrades=() => axios.get('/api/grades')
const CreateNewStudent=(data:any)=>axios.post('/api/students',data)
const GetAllStudents = ()=>axios.get('/api/students')
const DeleteStudentRecord = (id:any) => axios.delete('/api/students?id='+id)
const GetAttendanceList = (grade:any,month:any) => axios.get('/api/attendance?grade='+grade+'&month='+month)
const MarkAttendance = (data:any) => axios.post("/api/attendance",data)
const MarkAbsent = (studentId:any,day:any,date:any)=>axios.delete("/api/attendance?studentId="+studentId+"&day="+day+"&date="+date)
const TotalPresentCountByDay=(date:any,grade:any)=>axios.get('/api/dashboard?date='+date+'&grade='+grade)
export default {
    GetAllGrades,
    CreateNewStudent,
    GetAllStudents,
    DeleteStudentRecord,
    GetAttendanceList,
    MarkAttendance,
    MarkAbsent,
    TotalPresentCountByDay
}
