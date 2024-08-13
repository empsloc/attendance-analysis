import { getUniqueRecord } from "@/app/_services/service"
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react"
import Card from "./Card"

function StatusList({attendanceList}:any){
    const [totalStudent,setTotalStudent] = useState(0)
    const [presentPerc,setPresentPerc] = useState(0)
    useEffect(()=>{
        if(attendanceList){
            const totalSt= getUniqueRecord(attendanceList)
            setTotalStudent(totalSt.length)
            const today= moment().format('D')
            const PresentPerc = (attendanceList.length/(totalSt.length*Number(today))*100)
            setPresentPerc(PresentPerc)
            }
            else{
                console.log("attendance list not received")
            }
    },[attendanceList])
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
            <Card icon ={<GraduationCap/>} title='Total student' value = {totalStudent}/>
            <Card icon ={<TrendingUp/>} title='Total present' value = {(presentPerc).toFixed(1)+"%"}/>
            <Card icon ={<TrendingDown/>} title='Total absent' value = {(100-presentPerc).toFixed(1)+"%"}/>
        </div>
    )
}

export default StatusList