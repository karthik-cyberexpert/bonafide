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
import { dummyStudents } from "@/data/dummyData";
import { dummyTutorProfile } from "@/data/dummyProfiles";

// Filter students assigned to the current tutor
const assignedStudents = dummyStudents.filter(
  (student) => student.tutor === dummyTutorProfile.name
);

const TutorStudents = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Students</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Register No.</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignedStudents.length > 0 ? (
              assignedStudents.map((student) => (
                <TableRow key={student.registerNumber}>
                  <TableCell className="font-medium">
                    {student.registerNumber}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.batch}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No students assigned.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TutorStudents;