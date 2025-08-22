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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requests as appRequests, students as appStudents } from "@/data/appData";
import { dummyTemplates } from "@/data/dummyTemplates";
import { BonafideRequest } from "@/lib/types";
import { showSuccess } from "@/utils/toast";
import { formatDateToIndian } from "@/lib/utils";
import RequestDetailsView from "@/components/shared/RequestDetailsView";

const HodPendingRequests = () => {
  const [requests, setRequests] = useState<BonafideRequest[]>(appRequests);
  const [selectedRequest, setSelectedRequest] =
    useState<BonafideRequest | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isForwardOpen, setIsForwardOpen] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const handleForward = () => {
    if (!selectedRequest || !selectedTemplate) return;
    const updatedRequests = appRequests.map((req) =>
      req.id === selectedRequest.id
        ? {
            ...req,
            status: "Pending Admin Approval",
            templateId: selectedTemplate,
          }
        : req
    );
    appRequests.length = 0;
    appRequests.push(...updatedRequests);
    setRequests(updatedRequests);
    showSuccess(`Request ${selectedRequest.id} forwarded to Admin.`);
    setIsForwardOpen(false);
    setSelectedRequest(null);
    setSelectedTemplate("");
  };

  const handleReturn = () => {
    if (!selectedRequest || !returnReason) return;
    const updatedRequests = appRequests.map((req) =>
      req.id === selectedRequest.id
        ? { ...req, status: "Returned by HOD", returnReason: returnReason }
        : req
    );
    appRequests.length = 0;
    appRequests.push(...updatedRequests);
    setRequests(updatedRequests);
    showSuccess(`Request ${selectedRequest.id} returned to student.`);
    setIsReturnOpen(false);
    setReturnReason("");
    setSelectedRequest(null);
  };

  const openReviewDialog = (request: BonafideRequest) => {
    setSelectedRequest(request);
    setIsReviewOpen(true);
  };

  const pendingRequests = requests.filter(
    (req) => req.status === "Pending HOD Approval"
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
              Return to Student
            </Button>
            <Button
              onClick={() => {
                setIsReviewOpen(false);
                setIsForwardOpen(true);
              }}
            >
              Forward to Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isForwardOpen} onOpenChange={setIsForwardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Certificate Template</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="template-select">Template</Label>
            <Select onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template-select">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {dummyTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleForward} disabled={!selectedTemplate}>
              Forward
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
              Please provide a reason for returning this request.
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

export default HodPendingRequests;