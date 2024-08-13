import GlobalApi from "@/app/_services/GlobalApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function StudentListTable({ studentList, refreshData }: any) {
  const customButton = (props: any) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" >
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const [colDef, setColDef] = useState([
    { field: "id", filter: true },
    { field: "fullName", filter: true },
    { field: "address", filter: true },
    { field: "contactNumber", filter: true },
    { field: "action", cellRenderer: customButton },
  ]);

  const [rowData, setRowData] = useState();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    studentList && setRowData(studentList);
  }, [studentList]);

  const DeleteRecord=(id:any)=>{
      GlobalApi.DeleteStudentRecord(id).then(resp=>{
        if(resp){
          toast('Record deleted successfully')
          refreshData()
        }
      })
  }
  return (
    <div>
      <div
        className="ag-theme-material-dark " // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <div className="flex gap-2 p-2 rounded-lg border shadow-sm mb-4 max-w-sm  ">
          <Search />
          <input
            placeholder="Search..."
            type="text"
            className="w-full outline-none bg-transparent"
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDef}
          pagination={true}
          quickFilterText={searchInput}
          paginationPageSize={10}
          paginationPageSizeSelector={[25, 50, 100]}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
