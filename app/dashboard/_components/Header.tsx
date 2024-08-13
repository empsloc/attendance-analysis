"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

function Header() {
  const { user } = useKindeBrowserClient()
  return (
    <div className="shadow-sm border flex justify-between items-center p-4">
      <div className="">
        Dashbooard
      </div>
      <div className="">
        <Image className="rounded-full" src={user?.picture!} alt="" width={35} height={35}/>
      </div>
    </div>
  )
}

export default Header