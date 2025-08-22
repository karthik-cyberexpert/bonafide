import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requests as appRequests, students as appStudents } from "@/data/appData";
import { getStatusVariant, formatDateToIndian } from "@/lib/utils";

const TutorRequestHistory = () => {
  const [selectedSemester, setSelectedSemester] = useState("all");

  const requestHistory = appRequests.filter(
    (req) => req.status !== "Pending Tutor Approval"
  );

  const filteredHistory = requestHistory.filter((request) => {
    if (selectedSemester === "all") return true;
    const student = appStudents.find(
      (s) => s.registerNumber === request.studentId
    );
    return student?.currentSemester === `${selectedSemester}th`;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Request History</CardTitle>
        <div className="flex items-center gap-2">
          <Select onValueChange={setSelectedSemester} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <SelectItem key={sem} value={String(sem)}>
                  Semester {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    <div>{request.studentName}</div>
                    <div className="text-xs text-muted-foreground">
                      [{request.studentId}]
                    </div>
                  </TableCell>
                  <TableCell>{formatDateToIndian(request.date)}</TableCell>
                  <TableCell>{request.type}</TableCell>
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
                  No request history found for the selected filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TutorRequestHistory;