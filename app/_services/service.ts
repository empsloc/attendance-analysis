export const getUniqueRecord=(attendanceList:any)=>{
    const uniqueRecord:any[]=[]
    const existingUser =new Set()
    attendanceList?.forEach((record:any)=>{
        if(!existingUser.has(record.studentId)){
            existingUser.add(record.studentId)
            uniqueRecord.push(record)
        }
    })
    return uniqueRecord
}