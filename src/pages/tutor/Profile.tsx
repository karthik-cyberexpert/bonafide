import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileField from "@/components/shared/ProfileField";
import EditableProfileField from "@/components/shared/EditableProfileField";
import { dummyTutorProfile } from "@/data/dummyProfiles";
import { TutorProfile as TutorProfileType } from "@/lib/types";

const TutorProfile = () => {
  const [profile, setProfile] = useState<TutorProfileType>(dummyTutorProfile);

  const handleSaveField = (field: keyof TutorProfileType, value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
    console.log(`Saving ${field}:`, value);
  };

  return (
    <Card>
      <CardHeader>
        <ProfileHeader name={profile.name} subtitle="Tutor Profile Details" />
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ProfileField label="Department">{profile.department}</ProfileField>
          <ProfileField label="Batch Assigned">
            {profile.batchAssigned}
          </ProfileField>
          <EditableProfileField
            label="Email"
            value={profile.email}
            onSave={(newValue) => handleSaveField("email", newValue)}
          />
          <EditableProfileField
            label="Phone Number"
            value={profile.phoneNumber}
            onSave={(newValue) => handleSaveField("phoneNumber", newValue)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorProfile;