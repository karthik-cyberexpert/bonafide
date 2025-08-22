import { BonafideRequest } from "@/lib/types";
import { students as appStudents } from "@/data/appData";
import { formatDateToIndian } from "@/lib/utils";
import ProfileField from "./ProfileField";

interface RequestDetailsViewProps {
  request: BonafideRequest;
}

const RequestDetailsView = ({ request }: RequestDetailsViewProps) => {
  const student = appStudents.find(
    (s) => s.registerNumber === request.studentId
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <ProfileField label="Request ID">{request.id}</ProfileField>
      <ProfileField label="Date Submitted">
        {formatDateToIndian(request.date)}
      </ProfileField>
      <ProfileField label="Student Name">{request.studentName}</ProfileField>
      <ProfileField label="Register Number">{request.studentId}</ProfileField>
      {student && (
        <>
          <ProfileField label="Department">{student.department}</ProfileField>
          <ProfileField label="Batch">{student.batch}</ProfileField>
          <ProfileField label="Current Semester">
            {student.currentSemester}
          </ProfileField>
          <ProfileField label="Tutor">{student.tutor}</ProfileField>
          <ProfileField label="HOD">{student.hod}</ProfileField>
        </>
      )}
      <ProfileField label="Request Type">{request.type}</ProfileField>
      {request.subType && (
        <ProfileField label="Sub-type">{request.subType}</ProfileField>
      )}
      <div className="md:col-span-2">
        <ProfileField label="Reason">{request.reason}</ProfileField>
      </div>
    </div>
  );
};

export default RequestDetailsView;