import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyStudents } from "@/data/dummyData";
import { dummyRequests } from "@/data/dummyRequests";
import { dummyTemplates } from "@/data/dummyTemplates";
import { BonafideRequest } from "@/lib/types";
import { getStatusVariant } from "@/lib/utils";
import { generatePdf, getCertificateHtml } from "@/lib/pdf";
import { Download } from "lucide-react";

const studentRequests = dummyRequests.filter(
  (req) => req.studentId === "S12345"
);

const MyRequests = () => {
  const handleDownload = async (request: BonafideRequest) => {
    const student = dummyStudents.find(
      (s) => s.registerNumber === request.studentId
    );
    const template = dummyTemplates.find((t) => t.id === request.templateId);

    const htmlContent = getCertificateHtml(request, student, template, true);
    const fileName = `Bonafide-${request.studentId}.pdf`;
    await generatePdf(htmlContent, fileName);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {request.status === "Approved" && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownload(request)}
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  )}
                  {request.status.startsWith("Returned by") && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reason for Return</DialogTitle>
                          <DialogDescription>
                            Your request was returned for the following reason.
                            Please address the issue and resubmit if necessary.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm font-medium bg-muted p-4 rounded-md">
                            {request.returnReason || "No reason provided."}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MyRequests;