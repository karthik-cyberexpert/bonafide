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
import { generatePdf, getCertificateHtml } from "@/lib/pdf";
import { formatDateToIndian } from "@/lib/utils";

const AdminPendingRequests = () => {
  const [requests, setRequests] = useState<BonafideRequest[]>(dummyRequests);
  const [addSignature, setAddSignature] = useState(true);

  const handleApproveAndDownload = async (request: BonafideRequest) => {
    const student = dummyStudents.find(
      (s) => s.registerNumber === request.studentId
    );
    const template = dummyTemplates.find((t) => t.id === request.templateId);

    const htmlContent = getCertificateHtml(
      request,
      student,
      template,
      addSignature
    );
    const fileName = `Bonafide-${request.studentId}.pdf`;

    await generatePdf(htmlContent, fileName);

    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === request.id ? { ...req, status: "Approved" } : req
      )
    );
    showSuccess(`Request ${request.id} approved and PDF downloaded.`);
    setAddSignature(true);
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
                const template = dummyTemplates.find(
                  (t) => t.id === request.templateId
                );
                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      <div>{request.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        [{request.studentId}]
                      </div>
                    </TableCell>
                    <TableCell>{student?.hod || "N/A"}</TableCell>
                    <TableCell>{student?.batch || "N/A"}</TableCell>
                    <TableCell>{student?.currentSemester || "N/A"}</TableCell>
                    <TableCell>{formatDateToIndian(request.date)}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        Return to HOD
                      </Button>
                      <Dialog onOpenChange={() => setAddSignature(true)}>
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
                            <div
                              className="p-4 border rounded-md bg-muted prose dark:prose-invert max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: getCertificateHtml(
                                  request,
                                  student,
                                  template,
                                  addSignature
                                ),
                              }}
                            />
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
                                onClick={() =>
                                  handleApproveAndDownload(request)
                                }
                              >
                                Approve and Download PDF
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