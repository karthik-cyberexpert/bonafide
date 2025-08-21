import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileField from "@/components/shared/ProfileField";
import EditableProfileField from "@/components/shared/EditableProfileField";
import { dummyStudentProfile } from "@/data/dummyProfiles";
import { StudentProfile as StudentProfileType } from "@/lib/types";

const StudentProfile = () => {
  const [profile, setProfile] = useState<StudentProfileType>(dummyStudentProfile);

  const handleSaveField = (
    field: keyof StudentProfileType,
    value: string
  ) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
    console.log(`Saving ${field}:`, value);
  };

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
          <ProfileField label="Tutor">{profile.tutor}</ProfileField>
          <ProfileField label="HOD">{profile.hod}</ProfileField>
          <ProfileField label="Department">{profile.department}</ProfileField>
          <ProfileField label="Parent Name">{profile.parentName}</ProfileField>

          <EditableProfileField
            label="Email"
            value={profile.email}
            onSave={(newValue) => handleSaveField("email", newValue)}
          />
          <EditableProfileField
            label="Mobile"
            value={profile.phoneNumber}
            onSave={(newValue) => handleSaveField("phoneNumber", newValue)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfile;