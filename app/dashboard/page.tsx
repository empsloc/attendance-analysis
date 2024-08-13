"use client";
import moment from "moment";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import GradeSelection from "../_components/GradeSelection";
import MonthSelection from "../_components/MonthSelection";
import GlobalApi from "../_services/GlobalApi";
import BarChartComponent from "./_components/BarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";
import StatusList from "./_components/StatusList";

function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList,setAttendanceList] = useState()
  const [totalPresentData,setTotalPresentData] = useState([])
  useEffect(() => {
    setTheme("dark");
    GetTotalPresentCountByDay()
    getStudentAttendance()
    
  }, [selectedMonth||selectedGrade]);

  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/yyyy")
    ).then((res) => {
     setAttendanceList(res.data)
    });
  };
  const GetTotalPresentCountByDay=()=>{
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'),selectedGrade)
    .then(resp=>{
      setTotalPresentData(resp.data)
    })
  }
  return (
    <div className="p-7 ">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelection selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <BarChartComponent attendanceList={attendanceList}
            totalPresentData={totalPresentData}/>
          </div>
          <div className="">
            <PieChartComponent attendanceList={attendanceList}/>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;
