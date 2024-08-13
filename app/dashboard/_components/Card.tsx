
function Card({icon,title,value}:any) {
  return (
    <div className="flex items-center gap-5 p-7 bg-secondary rounded-lg shadow-md">
      <div className="">
        {icon}
      </div>
      <div className="">
        <h2 className="font-bold">{title}</h2>
        <h2 className="text-sm">{value}</h2>
      </div>
    </div>
  )
}

export default Card