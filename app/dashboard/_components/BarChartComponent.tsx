import { getUniqueRecord } from "@/app/_services/service";
import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
function BarChartComponent({ attendanceList, totalPresentData }: any) {
    const [data,setData] = useState([])
    useEffect(()=>{
            formatAtttendanceListCount()
    },[attendanceList||totalPresentData])
    const formatAtttendanceListCount=()=>{
    const totalStudent = getUniqueRecord(attendanceList)
    const result =totalPresentData.map(((item:any)=>({
        day:item.day,
        presentCount:item.presentCount,
        absentCount:Number(totalStudent?.length)-Number(item.presentCount)
    })))

    console.log(result)
    setData(result)
  }
    return (
    <div className="p-5 border rounded-lg shadow-sm">
        <h2 className="font-bold  my-5">Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
      <BarChart  height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="presentCount" name="Total present" fill="#8884d8" />
        <Bar dataKey="absentCount" name="Total Absent" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
