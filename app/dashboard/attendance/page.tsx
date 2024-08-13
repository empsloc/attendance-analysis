"use client"
import GradeSelection from "@/app/_components/GradeSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useState } from "react";
import MonthSelection from "../../_components/MonthSelection";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {
  const [selectedMonth,setSelectedMonth] = useState()
  const [selectedGrade,setSelectedGrade] = useState()
  const [attendanceList,setAttendanceList] = useState()
  const onSearchHandler=()=>{
      // console.log(selectedMonth,selectedGrade)
      const month = moment(selectedMonth).format('MM/YYYY')
      // console.log(month)
      GlobalApi.GetAttendanceList(selectedGrade,month).then(resp=>{
        setAttendanceList(resp.data)
      })
    }
  return (
    <div className="p-7 flex flex-col gap-3">
      <div className="text-2xl font-bold">Attendance</div>
     

      <div className=" flex gap-4 p-3 border rounded-xl shadow-md my-5">
        <div className="flex items-center gap-2">
        <label>Select Month : </label>
        <MonthSelection selectedMonth = {(value:any)=>setSelectedMonth(value)}/>
        </div>
        <div className="flex items-center gap-2">
        <label>Select Grade : </label>
        <GradeSelection selectedGrade ={(v:any)=>setSelectedGrade(v)}/>
        </div>
        <Button onClick={()=>onSearchHandler()}> Search</Button>
      </div>

      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth}/>
    
    </div>
  );
}

export default Attendance;
