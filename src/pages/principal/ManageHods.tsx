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
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hods as appHods } from "@/data/appData";
import { HodProfile } from "@/lib/types";
import { showSuccess } from "@/utils/toast";

const ManageHods = () => {
  const [faculties, setFaculties] = useState<HodProfile[]>(appHods);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<HodProfile | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedFaculty = {
      name: formData.get("name") as string,
      username:
        editingFaculty?.username ||
        (formData.get("name") as string).toLowerCase().replace(" ", "_"),
      department: formData.get("department") as string,
      email: formData.get("email") as string,
      mobileNumber: formData.get("mobileNumber") as string,
    };

    if (editingFaculty) {
      const updatedFaculties = appHods.map((f) =>
        f.username === editingFaculty.username ? updatedFaculty : f
      );
      appHods.length = 0;
      appHods.push(...updatedFaculties);
      setFaculties(updatedFaculties);
      showSuccess("HOD details updated successfully.");
    } else {
      appHods.push(updatedFaculty);
      setFaculties([...appHods]);
      showSuccess("New HOD added successfully.");
    }

    setIsAddEditDialogOpen(false);
    setEditingFaculty(null);
  };

  const handleDelete = (username: string) => {
    const updatedFaculties = appHods.filter((f) => f.username !== username);
    appHods.length = 0;
    appHods.push(...updatedFaculties);
    setFaculties(updatedFaculties);
    showSuccess("HOD removed successfully.");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage HODs</CardTitle>
        <Dialog
          open={isAddEditDialogOpen}
          onOpenChange={(isOpen) => {
            setIsAddEditDialogOpen(isOpen);
            if (!isOpen) setEditingFaculty(null);
          }}
        >
          <DialogTrigger asChild>
            <Button>Add New HOD</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFaculty ? "Edit HOD Details" : "Add New HOD"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingFaculty?.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    defaultValue={editingFaculty?.department}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingFaculty?.email}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    defaultValue={editingFaculty?.mobileNumber}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculties.map((faculty) => (
              <TableRow key={faculty.username}>
                <TableCell className="font-medium">{faculty.name}</TableCell>
                <TableCell>{faculty.department}</TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell>{faculty.mobileNumber}</TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingFaculty(faculty);
                            setIsAddEditDialogOpen(true);
                          }}
                        >
                          Edit Details
                        </DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive">
                            Remove HOD
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          remove {faculty.name} from the records.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(faculty.username)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManageHods;