import { Badge } from "@/components/ui/badge";
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
import { dummyRequests } from "@/data/dummyRequests";
import { BonafideRequest } from "@/lib/types";
import { Download } from "lucide-react";

const studentRequests = dummyRequests.filter(
  (req) => req.studentId === "S12345"
);

const getStatusVariant = (status: BonafideRequest["status"]) => {
  switch (status) {
    case "Approved":
      return "success";
    case "Pending Tutor Approval":
    case "Pending HOD Approval":
    case "Pending Admin Approval":
      return "secondary";
    case "Returned by Tutor":
    case "Returned by HOD":
    case "Returned by Admin":
      return "destructive";
    default:
      return "default";
  }
};

const StudentDashboard = () => {
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
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
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

export default StudentDashboard;