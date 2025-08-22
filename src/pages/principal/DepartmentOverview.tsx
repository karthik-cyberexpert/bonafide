import { useMemo } from "react";
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
  departments as appDepartments,
  hods as appHods,
  students as appStudents,
  tutors as appTutors,
} from "@/data/appData";

const DepartmentOverview = () => {
  const departmentData = useMemo(() => {
    return appDepartments.map((dept) => {
      const hod = appHods.find((h) => h.department === dept.name);
      const activeStudents = appStudents.filter(
        (s) => s.department === dept.name
      ).length;
      const tutorsInDept = appTutors.filter(
        (t) => t.department === dept.name
      ).length;

      return {
        ...dept,
        hodName: hod?.name || "N/A",
        totalActiveStudents: activeStudents,
        totalTutors: tutorsInDept,
      };
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department Name</TableHead>
              <TableHead>HOD</TableHead>
              <TableHead>Established Year</TableHead>
              <TableHead>Active Students</TableHead>
              <TableHead>Tutors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departmentData.length > 0 ? (
              departmentData.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.hodName}</TableCell>
                  <TableCell>{dept.establishedYear}</TableCell>
                  <TableCell>{dept.totalActiveStudents}</TableCell>
                  <TableCell>{dept.totalTutors}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No departments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DepartmentOverview;