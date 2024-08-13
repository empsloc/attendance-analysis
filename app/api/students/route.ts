import { db } from "@/utils"
import { STUDENTS } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req:any,res:any) {
    const data = await req.json()

    const result = await db.insert(STUDENTS).values({
        fullName:data?.fullName,
        grade:data?.grade,
        address:data?.address,
        contactNumber:data?.contactNumber
    })

    return  NextResponse.json(result)
}

export async function GET(req:any) {
    const response = await db.select().from(STUDENTS)
    return NextResponse.json(response)
}

export async function DELETE(req:any) {
    const searchParams  =   req.nextUrl.searchParams
    const   id = searchParams.get('id')

    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id,id))

    return NextResponse.json(result)
}