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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requests as appRequests } from "@/data/appData";
import { formatDateToIndian } from "@/lib/utils";
import { BonafideRequest } from "@/lib/types";
import { showSuccess } from "@/utils/toast";

const TutorPendingRequests = () => {
  const [requests, setRequests] = useState<BonafideRequest[]>(appRequests);
  const [returnReason, setReturnReason] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<BonafideRequest | null>(null);

  const handleForward = (requestId: string) => {
    const updatedRequests = appRequests.map((req) =>
      req.id === requestId ? { ...req, status: "Pending HOD Approval" } : req
    );
    appRequests.length = 0;
    appRequests.push(...updatedRequests);
    setRequests(updatedRequests);
    showSuccess(`Request ${requestId} forwarded to HOD.`);
  };

  const handleReturn = () => {
    if (!selectedRequest || !returnReason) return;
    const updatedRequests = appRequests.map((req) =>
      req.id === selectedRequest.id
        ? { ...req, status: "Returned by Tutor", returnReason: returnReason }
        : req
    );
    appRequests.length = 0;
    appRequests.push(...updatedRequests);
    setRequests(updatedRequests);
    showSuccess(`Request ${selectedRequest.id} returned to student.`);
    setReturnReason("");
    setSelectedRequest(null);
  };

  const pendingRequests = requests.filter(
    (req) => req.status === "Pending Tutor Approval"
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
                  <TableCell className="text-right space-x-2">
                    <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedRequest(null)}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          Return to Student
                        </Button>
                      </DialogTrigger>
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
                            <Button
                              onClick={handleReturn}
                              disabled={!returnReason}
                            >
                              Confirm Return
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" onClick={() => handleForward(request.id)}>
                      Forward to HOD
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
  );
};

export default TutorPendingRequests;