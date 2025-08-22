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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { dummyRequests } from "@/data/dummyRequests";
import { dummyTemplates } from "@/data/dummyTemplates";
import { dummyStudents } from "@/data/dummyData";
import { BonafideRequest } from "@/lib/types";
import { showSuccess } from "@/utils/toast";

const HodPendingRequests = () => {
  const [requests, setRequests] = useState<BonafideRequest[]>(dummyRequests);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const handleForward = (requestId: string) => {
    if (!selectedTemplate) {
      alert("Please select a template.");
      return;
    }
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "Pending Admin Approval",
              templateId: selectedTemplate,
            }
          : req
      )
    );
    showSuccess(`Request ${requestId} forwarded to Admin.`);
    setSelectedTemplate("");
  };

  const pendingRequests = requests.filter(
    (req) => req.status === "Pending HOD Approval"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => {
                const student = dummyStudents.find(
                  (s) => s.registerNumber === request.studentId
                );
                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      <div>{request.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        [{request.studentId}]
                      </div>
                    </TableCell>
                    <TableCell>{student?.tutor || "N/A"}</TableCell>
                    <TableCell>{student?.batch || "N/A"}</TableCell>
                    <TableCell>{student?.currentSemester || "N/A"}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        Return to Student
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">Forward to Admin</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Select Certificate Template
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Label htmlFor="template-select">Template</Label>
                            <Select onValueChange={setSelectedTemplate}>
                              <SelectTrigger id="template-select">
                                <SelectValue placeholder="Select a template" />
                              </SelectTrigger>
                              <SelectContent>
                                {dummyTemplates.map((template) => (
                                  <SelectItem
                                    key={template.id}
                                    value={template.id}
                                  >
                                    {template.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                onClick={() => handleForward(request.id)}
                                disabled={!selectedTemplate}
                              >
                                Forward
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No pending requests.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HodPendingRequests;