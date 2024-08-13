"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type Inputs = {
  fullName: string;
  contactNumber: string;
  address: string;
  grade: string;
};

function AddNewStudent({refreshData}:any) {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading,setLoading]= useState(false)
  const onSubmit = (data: any) => {
    GlobalApi.CreateNewStudent(data).then((res) => {
     setLoading(true)
      if(res.data){
        reset()
        refreshData()
        setOpen(false)
        toast('Student Added')
      }
      setLoading(false)
      
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  useEffect(() => {
    GetAllGradesList();
  }, []);
  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((res) => {
      setGrades(res.data);
    });
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-3 gap-2 flex flex-col">
                  <label>Full Name</label>
                  <Input
                    placeholder="e.g Atharva Bokade"
                    {...register("fullName", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label>Select Grade</label>
                  <select
                    className="p-3 border rounded-xl"
                    {...register("grade", { required: true })}
                  >
                    {grades.map((item: any, index: any) => (
                      <option key={index} value={item.grade}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-3 gap-2 flex flex-col">
                  <label>Contact Number</label>
                  <Input
                    placeholder="e.g 4132562223"
                    type="number"
                    {...register("contactNumber")}
                  />
                </div>
                <div className="py-3 gap-2 flex flex-col">
                  <label>Address</label>
                  <Input
                    placeholder="e.g Ahinsa nagar rahul nagar"
                    {...register("address")}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant={"ghost"} onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">{loading?<LoaderIcon className="animate-spin"/>: "Save"}</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
