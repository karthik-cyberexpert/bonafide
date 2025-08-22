import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  students as appStudents,
  batches as appBatches,
  departments as appDepartments,
} from "@/data/appData";
import { Download, MoreHorizontal, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadStudentTemplate, parseStudentFile } from "@/lib/xlsx";
import { showSuccess, showError } from "@/utils/toast";

const StudentManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredStudents = appStudents.filter((student) => {
    const departmentMatch =
      selectedDepartment === "all" || student.department === selectedDepartment;
    const batchMatch =
      selectedBatch === "all" || student.batch === selectedBatch;
    return departmentMatch && batchMatch;
  });

  const handleFileUpload = async () => {
    if (!uploadFile) {
      showError("Please select a file to upload.");
      return;
    }

    try {
      const students = await parseStudentFile(uploadFile);
      // In a real app, you would send this data to your backend.
      console.log("Uploaded students:", students);
      showSuccess(`${students.length} students parsed successfully!`);
      setUploadFile(null);
      setIsUploadDialogOpen(false);
    } catch (error) {
      showError("Failed to parse the file. Please check the format.");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
        <CardTitle>Student Management</CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <Select onValueChange={setSelectedDepartment} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {appDepartments.map((dept) => (
                <SelectItem key={dept.id} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedBatch} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {appBatches.map((batch) => {
                const fullBatchName = batch.section
                  ? `${batch.name} ${batch.section}`
                  : batch.name;
                return (
                  <SelectItem key={batch.id} value={fullBatchName}>
                    {fullBatchName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={downloadStudentTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Upload Students</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Select an XLSX file with student data. Use the downloadable
                  template for the correct format.
                </p>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="student-file">XLSX File</Label>
                  <Input
                    id="student-file"
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleFileUpload} disabled={!uploadFile}>
                  Upload and Process
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Register No.</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Department</TableHead> {/* Added Department column */}
              <TableHead>Batch</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.registerNumber}>
                <TableCell className="font-medium">
                  {student.registerNumber}
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.department}</TableCell>{" "}
                {/* Display Department */}
                <TableCell>{student.batch}</TableCell>
                <TableCell>{student.tutor}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Student</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove Student
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentManagement;