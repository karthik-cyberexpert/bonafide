import { useState, useEffect, useMemo } from "react";
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
import { dummyBatches, dummyTutors } from "@/data/dummyData";
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
  DialogTrigger,
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
import { showSuccess, showError } from "@/utils/toast";
import { Batch } from "@/lib/types";
import {
  calculateCurrentSemesterForBatch,
  getSemesterDateRange,
  formatDateToIndian,
} from "@/lib/utils";

const BatchManagement = () => {
  const [batches, setBatches] = useState<Batch[]>(dummyBatches);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSemesterDialogOpen, setIsSemesterDialogOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [newBatch, setNewBatch] = useState<Partial<Batch>>({
    name: "",
    totalSections: 1,
  });

  const groupedBatches = useMemo(() => {
    return batches.reduce(
      (acc, batch) => {
        if (!acc[batch.name]) {
          acc[batch.name] = [];
        }
        acc[batch.name].push(batch);
        return acc;
      },
      {} as Record<string, Batch[]>
    );
  }, [batches]);

  const [selectedSections, setSelectedSections] = useState<
    Record<string, string>
  >(() => {
    const initialState: Record<string, string> = {};
    for (const batchName in groupedBatches) {
      initialState[batchName] = groupedBatches[batchName][0].id;
    }
    return initialState;
  });

  useEffect(() => {
    const updatedBatches = batches.map((batch) => {
      const fullBatchName = batch.section
        ? `${batch.name} ${batch.section}`
        : batch.name;
      const currentSemester = calculateCurrentSemesterForBatch(fullBatchName);
      const { from, to } = getSemesterDateRange(fullBatchName, currentSemester);
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

  const handleSectionChange = (batchName: string, newBatchId: string) => {
    setSelectedSections((prev) => ({
      ...prev,
      [batchName]: newBatchId,
    }));
  };

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

  const handleOpenSemesterDialog = (batch: Batch) => {
    setEditingBatch({ ...batch });
    setIsSemesterDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!editingBatch) return;

    const originalBatch = batches.find((b) => b.id === editingBatch.id);
    if (!originalBatch) return;

    const oldTotalSections = originalBatch.totalSections || 1;
    const newTotalSections = editingBatch.totalSections || 1;

    let updatedBatches = batches.map((b) =>
      b.id === editingBatch.id
        ? { ...editingBatch, tutor: editingBatch.tutor || "Unassigned" }
        : b
    );

    if (oldTotalSections !== newTotalSections) {
      const batchName = editingBatch.name;
      const existingSections = updatedBatches
        .filter((b) => b.name === batchName)
        .sort((a, b) => (a.section || "").localeCompare(b.section || ""));

      updatedBatches = updatedBatches.map((b) =>
        b.name === batchName ? { ...b, totalSections: newTotalSections } : b
      );

      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (newTotalSections > oldTotalSections) {
        for (let i = oldTotalSections; i < newTotalSections; i++) {
          const sectionName = alphabet[i];
          const fullBatchName = `${batchName} ${sectionName}`;
          const currentSemester =
            calculateCurrentSemesterForBatch(fullBatchName);
          const { from, to } = getSemesterDateRange(
            fullBatchName,
            currentSemester
          );
          const newSection: Batch = {
            id: `B${Date.now()}${i}`,
            name: batchName,
            section: sectionName,
            tutor: "Unassigned",
            totalSections: newTotalSections,
            studentCount: 0,
            status: "Active",
            currentSemester,
            semesterFromDate: from,
            semesterToDate: to,
          };
          updatedBatches.push(newSection);
        }
      } else if (newTotalSections < oldTotalSections) {
        const sectionsToRemove = existingSections.slice(newTotalSections);
        const idsToRemove = new Set(sectionsToRemove.map((s) => s.id));
        updatedBatches = updatedBatches.filter((b) => !idsToRemove.has(b.id));
      }
    }

    setBatches(updatedBatches);
    showSuccess(`Batch "${editingBatch.name}" updated successfully.`);
    setIsEditDialogOpen(false);
    setEditingBatch(null);
  };

  const handleSaveSemesterChanges = () => {
    if (!editingBatch) return;
    setBatches(
      batches.map((b) => (b.id === editingBatch.id ? editingBatch : b))
    );
    showSuccess(
      `Semester details for "${editingBatch.name} - ${
        editingBatch.section || ""
      }" updated successfully.`
    );
    setIsSemesterDialogOpen(false);
    setEditingBatch(null);
  };

  const handleAddNewBatch = () => {
    const batchName = newBatch.name;
    const totalSections = newBatch.totalSections || 1;

    if (!batchName) {
      showError("Batch name is required.");
      return;
    }

    const newSections: Batch[] = [];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < totalSections; i++) {
      const sectionName = totalSections > 1 ? alphabet[i] : undefined;
      const fullBatchName = sectionName
        ? `${batchName} ${sectionName}`
        : batchName;
      const currentSemester = calculateCurrentSemesterForBatch(fullBatchName);
      const { from, to } = getSemesterDateRange(fullBatchName, currentSemester);

      const finalNewBatch: Batch = {
        id: `B${Date.now()}${i}`,
        name: batchName,
        section: sectionName,
        tutor: "Unassigned",
        totalSections: totalSections,
        studentCount: 0,
        status: "Active",
        currentSemester,
        semesterFromDate: from,
        semesterToDate: to,
      };
      newSections.push(finalNewBatch);
    }

    setBatches([...batches, ...newSections]);
    showSuccess(
      `Batch "${batchName}" with ${totalSections} section(s) created successfully.`
    );
    setIsAddDialogOpen(false);
    setNewBatch({ name: "", totalSections: 1 });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Batch Management</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Batch</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Batch</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-batch-name">
                    Batch (e.g., 2024-2028)
                  </Label>
                  <Input
                    id="new-batch-name"
                    value={newBatch.name}
                    onChange={(e) =>
                      setNewBatch({ ...newBatch, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-total-sections">Total Sections</Label>
                  <Input
                    id="new-total-sections"
                    type="number"
                    min="1"
                    value={newBatch.totalSections}
                    onChange={(e) =>
                      setNewBatch({
                        ...newBatch,
                        totalSections: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddNewBatch}>Create Batch</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Total Sections</TableHead>
                <TableHead>Assigned Tutor</TableHead>
                <TableHead>Current Sem</TableHead>
                <TableHead>Semester Start</TableHead>
                <TableHead>Semester End</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(groupedBatches).map((batchName) => {
                const sections = groupedBatches[batchName];
                const selectedBatchId =
                  selectedSections[batchName] || sections[0]?.id;
                const selectedBatchData =
                  batches.find((b) => b.id === selectedBatchId) || sections[0];

                if (!selectedBatchData) return null;

                return (
                  <TableRow key={batchName}>
                    <TableCell className="font-medium">{batchName}</TableCell>
                    <TableCell>
                      {sections.length > 1 ? (
                        <Select
                          value={selectedBatchData.id}
                          onValueChange={(value) =>
                            handleSectionChange(batchName, value)
                          }
                        >
                          <SelectTrigger className="w-[80px]">
                            <SelectValue>
                              {selectedBatchData.section}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {sections.map((section) => (
                              <SelectItem key={section.id} value={section.id}>
                                {section.section}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        selectedBatchData.section || "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      {selectedBatchData.totalSections || 1}
                    </TableCell>
                    <TableCell>{selectedBatchData.tutor}</TableCell>
                    <TableCell>{selectedBatchData.currentSemester}</TableCell>
                    <TableCell>
                      {formatDateToIndian(selectedBatchData.semesterFromDate)}
                    </TableCell>
                    <TableCell>
                      {formatDateToIndian(selectedBatchData.semesterToDate)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          selectedBatchData.status === "Active"
                            ? "success"
                            : "secondary"
                        }
                      >
                        {selectedBatchData.status}
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
                            onClick={() =>
                              handleOpenEditDialog(selectedBatchData)
                            }
                          >
                            Edit Batch Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleOpenSemesterDialog(selectedBatchData)
                            }
                          >
                            Edit Semester
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleStatus(selectedBatchData.id)
                            }
                          >
                            {selectedBatchData.status === "Active"
                              ? "Mark as Inactive"
                              : "Mark as Active"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Batch: {editingBatch?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="total-sections">Total Sections for Batch</Label>
              <Input
                id="total-sections"
                type="number"
                min="1"
                value={editingBatch?.totalSections || ""}
                onChange={(e) =>
                  setEditingBatch((prev) =>
                    prev
                      ? { ...prev, totalSections: Number(e.target.value) }
                      : null
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

      <Dialog
        open={isSemesterDialogOpen}
        onOpenChange={setIsSemesterDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Semester: {editingBatch?.name} - {editingBatch?.section}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-tutor">Assign Tutor</Label>
              <Select
                value={editingBatch?.tutor}
                onValueChange={(value) =>
                  setEditingBatch((prev) =>
                    prev ? { ...prev, tutor: value } : null
                  )
                }
              >
                <SelectTrigger id="edit-tutor">
                  <SelectValue placeholder="Select a tutor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  {dummyTutors.map((tutor) => (
                    <SelectItem key={tutor.username} value={tutor.name}>
                      {tutor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
              <Label htmlFor="from-date">Semester Start Date</Label>
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
              <Label htmlFor="to-date">Semester End Date</Label>
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
            <Button onClick={handleSaveSemesterChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BatchManagement;