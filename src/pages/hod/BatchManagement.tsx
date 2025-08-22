import { useState, useMemo } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from "@/utils/toast";
import { Batch } from "@/lib/types";

interface BatchGroup {
  name: string;
  totalSections: number;
  status: "Active" | "Inactive" | "Mixed";
}

const BatchManagement = () => {
  const [batches, setBatches] = useState<Batch[]>(dummyBatches);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBatchName, setNewBatchName] = useState("");
  const [numSections, setNumSections] = useState(1);

  const batchGroups = useMemo((): BatchGroup[] => {
    const groups: Record<string, Batch[]> = batches.reduce((acc, batch) => {
      acc[batch.name] = acc[batch.name] || [];
      acc[batch.name].push(batch);
      return acc;
    }, {} as Record<string, Batch[]>);

    return Object.entries(groups).map(([name, sectionDetails]) => {
      const activeCount = sectionDetails.filter(
        (s) => s.status === "Active"
      ).length;
      let status: "Active" | "Inactive" | "Mixed";
      if (activeCount === sectionDetails.length) {
        status = "Active";
      } else if (activeCount === 0) {
        status = "Inactive";
      } else {
        status = "Mixed";
      }

      return {
        name,
        totalSections: sectionDetails.length,
        status,
      };
    });
  }, [batches]);

  const handleAddBatch = () => {
    if (!newBatchName.match(/^\d{4}-\d{4}$/)) {
      showError("Please use format YYYY-YYYY (e.g., 2024-2028).");
      return;
    }
    if (numSections < 1 || numSections > 26) {
      showError("Number of sections must be between 1 and 26.");
      return;
    }

    const newSections: Batch[] = [];
    for (let i = 0; i < numSections; i++) {
      const section = String.fromCharCode(65 + i);
      newSections.push({
        id: `B-${newBatchName}-${section}`,
        name: newBatchName,
        section: section,
        tutor: "Unassigned",
        studentCount: 0,
        status: "Active",
        currentSemester: 1,
      });
    }

    setBatches((prev) => [...prev, ...newSections]);
    showSuccess(`Batch ${newBatchName} with ${numSections} section(s) created.`);
    setIsAddDialogOpen(false);
    setNewBatchName("");
    setNumSections(1);
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
                  <Label htmlFor="batch-name">Batch Name (Year Range)</Label>
                  <Input
                    id="batch-name"
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    placeholder="e.g., 2024-2028"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="num-sections">Number of Sections</Label>
                  <Input
                    id="num-sections"
                    type="number"
                    min="1"
                    max="26"
                    value={numSections}
                    onChange={(e) => setNumSections(Number(e.target.value))}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddBatch}>Create Batch</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch</TableHead>
                <TableHead>Total Sections</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batchGroups.map((group) => (
                <TableRow key={group.name}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.totalSections}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        group.status === "Active"
                          ? "success"
                          : group.status === "Inactive"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {group.status}
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
                        <DropdownMenuItem>Manage Sections</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Batch
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
    </>
  );
};

export default BatchManagement;