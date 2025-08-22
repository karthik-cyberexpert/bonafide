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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { dummyRequests } from "@/data/dummyRequests";
import { dummyTemplates } from "@/data/dummyTemplates";
import { dummyStudents } from "@/data/dummyData";
import { BonafideRequest } from "@/lib/types";
import { showSuccess } from "@/utils/toast";

const AdminPendingRequests = () => {
  const [requests, setRequests] = useState<BonafideRequest[]>(dummyRequests);
  const [addSignature, setAddSignature] = useState(false);

  const handleApprove = (requestId: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId ? { ...req, status: "Approved" } : req
      )
    );
    showSuccess(`Request ${requestId} has been approved.`);
    setAddSignature(false);
  };

  const getCertificatePreview = (request: BonafideRequest) => {
    const template = dummyTemplates.find((t) => t.id === request.templateId);
    const student = dummyStudents.find(
      (s) => s.registerNumber === request.studentId
    );
    if (!template) return "Template not found.";

    let content = template.content
      .replace("{studentName}", request.studentName)
      .replace("{studentId}", request.studentId)
      .replace("{reason}", request.reason)
      .replace("{parentName}", student?.parentName || "N/A");

    if (addSignature) {
      content += "\n\n\n--- E-Signed by Principal Thompson ---";
    }
    return content;
  };

  const pendingRequests = requests.filter(
    (req) => req.status === "Pending Admin Approval"
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
              <TableHead>HOD</TableHead>
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
                      {request.studentName}
                    </TableCell>
                    <TableCell>{student?.hod || "N/A"}</TableCell>
                    <TableCell>{student?.batch || "N/A"}</TableCell>
                    <TableCell>{student?.currentSemester || "N/A"}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        Return to HOD
                      </Button>
                      <Dialog onOpenChange={() => setAddSignature(false)}>
                        <DialogTrigger asChild>
                          <Button size="sm">Approve</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Approve Certificate</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <h3 className="font-semibold mb-2">
                              Certificate Preview
                            </h3>
                            <div className="p-4 border rounded-md bg-muted whitespace-pre-wrap text-sm">
                              {getCertificatePreview(request)}
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
                              <Checkbox
                                id="e-sign"
                                checked={addSignature}
                                onCheckedChange={(checked) =>
                                  setAddSignature(checked as boolean)
                                }
                              />
                              <Label htmlFor="e-sign">Add E-Signature</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                onClick={() => handleApprove(request.id)}
                              >
                                Approve and Issue
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

export default AdminPendingRequests;