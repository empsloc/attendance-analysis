"use client"
import GlobalApi from "@/app/_services/GlobalApi"
import { useEffect, useState } from "react"
import AddNewStudent from "./_components/AddNewStudent"
import StudentListTable from "./_components/StudentListTable"

function Students() {
  const [studentList,setStudentList] = useState([])
 
  useEffect(() => {
    GetAllStudents()
  
  }, [])
  
  const GetAllStudents=()=>{
    GlobalApi.GetAllStudents().then(res=>{
      setStudentList(res.data)
    })
  }
  return (
    <div className="p-7 ">
    <div className=" flex justify-between">
        <div className="font-bold text-xl">
            Students
        </div>

        <AddNewStudent refreshData={GetAllStudents}/>
    </div>
    <StudentListTable studentList={studentList} refreshData={GetAllStudents} />

    </div>
  )
}

export default Students