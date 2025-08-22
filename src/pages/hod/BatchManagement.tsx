import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  calculateCurrentSemesterForBatch,
  getSemesterDateRange,
} from "@/lib/utils";
import { dummyBatches } from "@/data/dummyData";
import BatchCard from "@/components/hod/BatchCard";

const BatchManagement = () => {
  const [batches, setBatches] = useState<Batch[]>(dummyBatches);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  useEffect(() => {
    const updatedBatches = batches.map((batch) => {
      const currentSemester = calculateCurrentSemesterForBatch(batch.name);
      const { from, to } = getSemesterDateRange(batch.name, currentSemester);
      return {
        ...batch,
        currentSemester,
        semesterFromDate: from,
        semesterToDate: to,
      };
    });
    setBatches(updatedBatches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setEditingBatch({ ...batch });
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!editingBatch) return;
    setBatches(
      batches.map((b) => (b.id === editingBatch.id ? editingBatch : b))
    );
    showSuccess(`Batch "${editingBatch.name}" updated successfully.`);
    setIsEditDialogOpen(false);
    setEditingBatch(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Batch Management</h1>
        <Button>Add New Batch</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <BatchCard
            key={batch.id}
            batch={batch}
            onEdit={handleOpenEditDialog}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

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