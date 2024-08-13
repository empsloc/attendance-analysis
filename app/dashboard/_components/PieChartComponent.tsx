import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

function PieChartComponent({attendanceList}:any) {
const [data,setData] = useState([{}])
    useEffect(()=>{
        if(attendanceList){
            const totalSt= getUniqueRecord(attendanceList)
            const today= moment().format('D')
            const PresentPerc = (attendanceList.length/(totalSt.length*Number(today))*100)
                setData([
                    {
                    name:'total Present',
                    value:Number(PresentPerc.toFixed(1)),
                    fill:"#8884d8"
                    },
                    {
                        name:'total Absent',
                        value:100-Number(PresentPerc.toFixed(1)),
                        fill:"#82ca9d"
                        },

                ])    
        }
            else{
                console.log("attendance list not received")
            }
    },[attendanceList])




  return (
    <div className="border p-5 rounded-xl">
        <div className="font-bold ">Monthly Attendance</div>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
