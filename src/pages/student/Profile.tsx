import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileField from "@/components/shared/ProfileField";
import { dummyStudentProfile } from "@/data/dummyProfiles";
import { StudentProfile as StudentProfileType } from "@/lib/types";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<StudentProfileType>(dummyStudentProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleSave = () => {
    // In a real app, you'd save this data to a backend.
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(dummyStudentProfile); // Reset changes
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <ProfileHeader name={profile.name} subtitle="Student Profile Details" />
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Non-editable fields */}
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

          {/* Editable fields */}
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Mobile</Label>
                <Input
                  id="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <>
              <ProfileField label="Email">{profile.email}</ProfileField>
              <ProfileField label="Mobile">{profile.phoneNumber}</ProfileField>
            </>
          )}
        </div>
        {isEditing && (
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentProfile;