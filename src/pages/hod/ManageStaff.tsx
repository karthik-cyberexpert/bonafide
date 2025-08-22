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
import { tutors as appTutors } from "@/data/appData";
import { TutorProfile } from "@/lib/types";
import { showSuccess } from "@/utils/toast";

const ManageStaff = () => {
  const [tutors, setTutors] = useState<TutorProfile[]>(appTutors);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<TutorProfile | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedTutor = {
      name: formData.get("name") as string,
      username:
        editingTutor?.username ||
        (formData.get("name") as string).toLowerCase().replace(" ", "_"),
      department: "Computer Science", // Assuming HOD can only add to their dept
      batchAssigned: formData.get("batchAssigned") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    };

    if (editingTutor) {
      const updatedTutors = appTutors.map((t) =>
        t.username === editingTutor.username ? updatedTutor : t
      );
      appTutors.length = 0;
      appTutors.push(...updatedTutors);
      setTutors(updatedTutors);
      showSuccess("Tutor details updated successfully.");
    } else {
      appTutors.push(updatedTutor);
      setTutors([...appTutors]);
      showSuccess("New tutor added successfully.");
    }

    setIsAddEditDialogOpen(false);
    setEditingTutor(null);
  };

  const handleDelete = (username: string) => {
    const updatedTutors = appTutors.filter((t) => t.username !== username);
    appTutors.length = 0;
    appTutors.push(...updatedTutors);
    setTutors(updatedTutors);
    showSuccess("Tutor removed successfully.");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Staff (Tutors)</CardTitle>
        <Dialog
          open={isAddEditDialogOpen}
          onOpenChange={(isOpen) => {
            setIsAddEditDialogOpen(isOpen);
            if (!isOpen) setEditingTutor(null);
          }}
        >
          <DialogTrigger asChild>
            <Button>Add New Tutor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTutor ? "Edit Tutor Details" : "Add New Tutor"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingTutor?.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="batchAssigned">Batch Assigned</Label>
                  <Input
                    id="batchAssigned"
                    name="batchAssigned"
                    defaultValue={editingTutor?.batchAssigned}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingTutor?.email}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    defaultValue={editingTutor?.phoneNumber}
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
              <TableHead>Batch Assigned</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutors.map((tutor) => (
              <TableRow key={tutor.username}>
                <TableCell className="font-medium">{tutor.name}</TableCell>
                <TableCell>{tutor.batchAssigned}</TableCell>
                <TableCell>{tutor.email}</TableCell>
                <TableCell>{tutor.phoneNumber}</TableCell>
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
                            setEditingTutor(tutor);
                            setIsAddEditDialogOpen(true);
                          }}
                        >
                          Edit Details
                        </DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive">
                            Remove Tutor
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          remove {tutor.name} from the records.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(tutor.username)}
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

export default ManageStaff;