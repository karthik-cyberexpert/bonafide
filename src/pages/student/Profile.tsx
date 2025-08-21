import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyStudentProfile } from "@/data/dummyProfiles";
import ProfileDetail from "@/components/shared/ProfileDetail";

const StudentProfile = () => {
  const profile = dummyStudentProfile;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileDetail label="Name" value={profile.name} />
        <ProfileDetail label="Register Number" value={profile.registerNumber} />
        <ProfileDetail label="Email" value={profile.email} />
        <ProfileDetail label="Phone Number" value={profile.phoneNumber} />
        <ProfileDetail label="Parent Name" value={profile.parentName} />
        <ProfileDetail label="Department" value={profile.department} />
        <ProfileDetail label="Batch" value={profile.batch} />
        <ProfileDetail
          label="Current Semester"
          value={profile.currentSemester}
        />
        <ProfileDetail label="Tutor" value={profile.tutor} />
        <ProfileDetail label="HOD" value={profile.hod} />
      </CardContent>
    </Card>
  );
};

export default StudentProfile;