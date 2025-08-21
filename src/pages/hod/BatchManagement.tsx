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
import { Badge } from "@/components/ui/badge";
import { dummyBatches, Batch } from "@/data/dummyData";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showSuccess } from "@/utils/toast";

const BatchManagement = () => {
  const [batches, setBatches] = useState<Batch[]>(dummyBatches);

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

  return (
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
              <TableHead>Student Count</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-medium">{batch.name}</TableCell>
                <TableCell>{batch.tutor}</TableCell>
                <TableCell>{batch.studentCount}</TableCell>
                <TableCell>
                  <Badge
                    variant={batch.status === "Active" ? "success" : "secondary"}
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
                      <DropdownMenuItem>Edit Batch</DropdownMenuItem>
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
  );
};

export default BatchManagement;