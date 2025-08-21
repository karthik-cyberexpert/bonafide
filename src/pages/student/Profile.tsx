import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileField from "@/components/shared/ProfileField";
import { dummyStudentProfile } from "@/data/dummyProfiles";

const StudentProfile = () => {
  const profile = dummyStudentProfile;

  return (
    <Card>
      <CardHeader>
        <ProfileHeader name={profile.name} subtitle="Student Profile Details" />
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ProfileField label="Register Number">
            {profile.registerNumber}
          </ProfileField>
          <ProfileField label="Academic Year">{profile.batch}</ProfileField>
          <ProfileField label="Current Semester">
            {profile.currentSemester}
          </ProfileField>
          <ProfileField label="Status">
            <Badge variant="success">Active</Badge>
          </ProfileField>
          <ProfileField label="Email">{profile.email}</ProfileField>
          <ProfileField label="Mobile">{profile.phoneNumber}</ProfileField>
          <ProfileField label="Tutor">{profile.tutor}</ProfileField>
          <ProfileField label="HOD">{profile.hod}</ProfileField>
          <ProfileField label="Department">{profile.department}</ProfileField>
          <ProfileField label="Parent Name">{profile.parentName}</ProfileField>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfile;