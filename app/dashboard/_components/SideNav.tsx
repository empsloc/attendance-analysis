"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

function SideNav() {
  const { user } =  useKindeBrowserClient()
  const menuItems=[
    {
      id:1,
      name:'Dashboard',
      icon:LayoutIcon,
      path:'/dashboard'
    },
    {
      id:2,
      name:'Students',
      icon:GraduationCap,
      path:'/dashboard/students'
    },
    {
      id:3,
      name:'Attendance',
      icon:Hand,
      path:'/dashboard/attendance'
    },
    {
      id:4,
      name:'Settings',
      icon:Settings,
      path:'/dashboard/settings'
    }
  ]
  const path = usePathname()

  return (
    <div className="border shadow-md h-screen p-4">
      <Image alt="" src ={"logo.svg"} width={180} height={50}/>
    <hr className="my-5"></hr>
    {menuItems.map((menu,index)=>(
     <Link href={menu.path}> <h2 className={`flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-primary cursor-pointer rounded-lg ${path==menu.path&&'bg-primary '}` }>
      <menu.icon/>
      {menu.name}
      </h2>
      </Link>
    ))}

    <div className="flex flex-col gap-3 bottom-5 fixed p-4">
      <Image className="rounded-full" src={user?.picture!} alt="" width={35} height={35}/>
      <div className="">
        <div className="flex text-sm font-bold">
          {user?.given_name} {user?.family_name}
        </div>
        <div className="flex text-sm text-slate-400">
          {user?.email}
        </div>
      </div>
    </div>
    </div>
  )
}

export default SideNav