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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requests as appRequests, students as appStudents } from "@/data/appData";
import { dummyTemplates } from "@/data/dummyTemplates";
import { BonafideRequest } from "@/lib/types";
import { showSuccess } from "@/utils/toast";
import { generatePdf, getCertificateHtml } from "@/lib/pdf";
import { formatDateToIndian } from "@/lib/utils";
import RequestDetailsView from "@/components/shared/RequestDetailsView";

const PrincipalPendingRequests = () => {
  const [requests, setRequests] = useState<BonafideRequest[]>(appRequests);
  const [selectedRequest, setSelectedRequest] =
    useState<BonafideRequest | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const [addSignature, setAddSignature] = useState(true);

  const handleApproveAndDownload = async () => {
    if (!selectedRequest) return;

    const student = appStudents.find(
      (s) => s.registerNumber === selectedRequest.studentId
    );
    const template = dummyTemplates.find(
      (t) => t.id === selectedRequest.templateId
    );

    const htmlContent = getCertificateHtml(
      selectedRequest,
      student,
      template,
      addSignature
    );
    const fileName = `Bonafide-${selectedRequest.studentId}.pdf`;

    await generatePdf(htmlContent, fileName);

    const updatedRequests = appRequests.map((req) =>
      req.id === selectedRequest.id ? { ...req, status: "Approved" } : req
    );
    appRequests.length = 0;
    appRequests.push(...updatedRequests);
    setRequests(updatedRequests);

    showSuccess(`Request ${selectedRequest.id} approved and PDF downloaded.`);
    setIsApproveOpen(false);
    setSelectedRequest(null);
    setAddSignature(true);
  };

  const handleReturn = () => {
    if (!selectedRequest || !returnReason) return;
    const updatedRequests = appRequests.map((req) =>
      req.id === selectedRequest.id
        ? { ...req, status: "Returned by Principal", returnReason: returnReason }
        : req
    );
    appRequests.length = 0;
    appRequests.push(...updatedRequests);
    setRequests(updatedRequests);
    showSuccess(`Request ${selectedRequest.id} returned to HOD.`);
    setIsReturnOpen(false);
    setReturnReason("");
    setSelectedRequest(null);
  };

  const openReviewDialog = (request: BonafideRequest) => {
    setSelectedRequest(request);
    setIsReviewOpen(true);
  };

  const pendingRequests = requests.filter(
    (req) => req.status === "Pending Principal Approval"
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      <div>{request.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        [{request.studentId}]
                      </div>
                    </TableCell>
                    <TableCell>{formatDateToIndian(request.date)}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => openReviewDialog(request)}>
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No pending requests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && <RequestDetailsView request={selectedRequest} />}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsReviewOpen(false);
                setIsReturnOpen(true);
              }}
            >
              Return to HOD
            </Button>
            <Button
              onClick={() => {
                setIsReviewOpen(false);
                setIsApproveOpen(true);
              }}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Approve Certificate</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="py-4">
              <h3 className="font-semibold mb-2">Certificate Preview</h3>
              <div
                className="p-4 border rounded-md bg-muted prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: getCertificateHtml(
                    selectedRequest,
                    appStudents.find(
                      (s) => s.registerNumber === selectedRequest.studentId
                    ),
                    dummyTemplates.find(
                      (t) => t.id === selectedRequest.templateId
                    ),
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
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleApproveAndDownload}>
              Approve and Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReturnOpen} onOpenChange={setIsReturnOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reason for Return</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="return-reason">
              Please provide a reason for returning this request to the HOD.
            </Label>
            <Textarea
              id="return-reason"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleReturn} disabled={!returnReason}>
              Confirm Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrincipalPendingRequests;