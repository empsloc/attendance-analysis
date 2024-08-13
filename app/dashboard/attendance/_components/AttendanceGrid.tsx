import GlobalApi from "@/app/_services/GlobalApi";
import { getUniqueRecord } from "@/app/_services/service";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
function AttendanceGrid({attendanceList,selectedMonth}:any) {
   const [rowData,setRowData] = useState<any[]>([])
   const [colDefs,setColDefs] = useState([
    { field:'studentId'},
    {field:'name',filter:true}
   ])
   const daysInMonth = (year:any,month:any)=>new Date(year,month+1,0).getDate()
   const numberOfDays = daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
   const daysArray = Array.from({length:numberOfDays},(_,i)=>i+1)
    useEffect(()=>{
        if(attendanceList){
        const userList = getUniqueRecord(attendanceList)
        setRowData(userList)
        // console.log(userList)
        daysArray.forEach((date:any)=>{
            setColDefs(prevData=>[...prevData,{
                field:date.toString(),width:55,editable:true
            }])
            userList.forEach(obj=>{
                obj[date]=isPresent(obj.studentId,date)
            })
        })
    }
    },[attendanceList])

    const isPresent=(studentId:any,day:any)=>{
        const result = attendanceList.find((item:any)=>item.day==day&&item.studentId==studentId)
        return result?true:false
    }

    
   const onMarkAttendance=(day:any,studentId:any,presentStatus:any)=>{
        const date=moment(selectedMonth).format('MM/yyyy')
        if(presentStatus){
        const data={
            day:day,
            studentId:studentId,
            present:presentStatus,
            date:date
        }
        GlobalApi.MarkAttendance(data).then(resp=>{
            console.log(resp)
            toast("Student Id "+studentId+" marked as present")
        })

    }
    else{
        GlobalApi.MarkAbsent(studentId,day,date).then(resp=>{toast("Student Id: "+studentId+" marked as absent")})
    }
   }
    // console.log(daysArray)
    return (
    <div>
         <div
  className="ag-theme-material-dark" // applying the Data Grid theme
  style={{ height: 500 }} // the Data Grid will fill the size of the parent container
 >
   <AgGridReact
       rowData={rowData}
       columnDefs={colDefs}
       onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
       pagination={true}
       paginationPageSize={10}
       paginationPageSizeSelector={[25, 50, 100]}
    />
 </div>
    </div>
  )
}

export default AttendanceGrid