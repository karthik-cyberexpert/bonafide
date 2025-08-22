import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { dummyBatches } from "@/data/dummyData";
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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { Batch } from "@/lib/types";

const BatchManagement = () => {
  const [batches, setBatches] = useState<Batch[]>(dummyBatches);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let wasUpdated = false;
    const updatedBatches = batches.map((batch) => {
      if (
        batch.semesterToDate &&
        batch.currentSemester &&
        batch.currentSemester < 8
      ) {
        const toDate = new Date(batch.semesterToDate);
        if (toDate < today) {
          wasUpdated = true;
          showSuccess(
            `Semester for batch "${batch.name}" automatically advanced to ${
              batch.currentSemester + 1
            }.`
          );
          return {
            ...batch,
            currentSemester: batch.currentSemester + 1,
            semesterFromDate: undefined,
            semesterToDate: undefined,
          };
        }
      }
      return batch;
    });

    if (wasUpdated) {
      setBatches(updatedBatches);
    }
  }, []);

  const handleToggleStatus = (batchId: string) => {
    setBatches((prevBatches) =>
      prevBatches.map((batch) => {
        if (batch.id === batchId) {
          const newStatus = batch.status === "Active" ? "Inactive" : "Active";
          showSuccess(`Batch "${batch.name}" marked as ${newStatus}.`);
          return { ...batch, status: newStatus };
        }
        return batch;
      })
    );
  };

  const handleOpenEditDialog = (batch: Batch) => {
    setEditingBatch(batch);
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!editingBatch) return;
    setBatches(batches.map((b) => (b.id === editingBatch.id ? editingBatch : b)));
    showSuccess(`Batch "${editingBatch.name}" updated successfully.`);
    setIsEditDialogOpen(false);
    setEditingBatch(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Batch Management</CardTitle>
          <Button>Add New Batch</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Name</TableHead>
                <TableHead>Assigned Tutor</TableHead>
                <TableHead>Current Sem</TableHead>
                <TableHead>Sem Start</TableHead>
                <TableHead>Sem End</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.name}</TableCell>
                  <TableCell>{batch.tutor}</TableCell>
                  <TableCell>{batch.currentSemester || "N/A"}</TableCell>
                  <TableCell>
                    {batch.semesterFromDate
                      ? new Date(batch.semesterFromDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {batch.semesterToDate
                      ? new Date(batch.semesterToDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        batch.status === "Active" ? "success" : "secondary"
                      }
                    >
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleOpenEditDialog(batch)}
                        >
                          Edit Batch
                        </DropdownMenuItem>
                        <DropdownMenuItem>Assign Tutor</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(batch.id)}
                        >
                          {batch.status === "Active"
                            ? "Mark as Inactive"
                            : "Mark as Active"}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Batch: {editingBatch?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-semester">Current Semester</Label>
              <Select
                value={String(editingBatch?.currentSemester || "")}
                onValueChange={(value) =>
                  setEditingBatch((prev) =>
                    prev ? { ...prev, currentSemester: Number(value) } : null
                  )
                }
              >
                <SelectTrigger id="current-semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={String(sem)}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="from-date">Semester From Date</Label>
              <Input
                id="from-date"
                type="date"
                value={editingBatch?.semesterFromDate || ""}
                onChange={(e) =>
                  setEditingBatch((prev) =>
                    prev ? { ...prev, semesterFromDate: e.target.value } : null
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="to-date">Semester To Date</Label>
              <Input
                id="to-date"
                type="date"
                value={editingBatch?.semesterToDate || ""}
                onChange={(e) =>
                  setEditingBatch((prev) =>
                    prev ? { ...prev, semesterToDate: e.target.value } : null
                  )
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BatchManagement;