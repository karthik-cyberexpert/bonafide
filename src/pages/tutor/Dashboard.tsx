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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { dummyRequests } from "@/data/dummyRequests";
import { getStatusVariant } from "@/lib/utils";

const TutorDashboard = () => {
  const pendingRequests = dummyRequests.filter(
    (req) => req.status === "Pending Tutor Approval"
  );

  const requestHistory = dummyRequests.filter(
    (req) => req.status !== "Pending Tutor Approval"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutor Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="history">Request History</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.studentName}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">
                          Return to Student
                        </Button>
                        <Button size="sm">Forward to HOD</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No pending requests.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestHistory.length > 0 ? (
                  requestHistory.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.studentName}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No request history.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TutorDashboard;