import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileField from "@/components/shared/ProfileField";
import EditableProfileField from "@/components/shared/EditableProfileField";
import { dummyHodProfile } from "@/data/dummyProfiles";
import { HodProfile as HodProfileType } from "@/lib/types";

const HodProfile = () => {
  const [profile, setProfile] = useState<HodProfileType>(dummyHodProfile);

  const handleSaveField = (field: keyof HodProfileType, value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
    console.log(`Saving ${field}:`, value);
  };

  return (
    <Card>
      <CardHeader>
        <ProfileHeader name={profile.name} subtitle="HOD Profile Details" />
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ProfileField label="Department">{profile.department}</ProfileField>
          <EditableProfileField
            label="Email"
            value={profile.email}
            onSave={(newValue) => handleSaveField("email", newValue)}
          />
          <EditableProfileField
            label="Mobile Number"
            value={profile.mobileNumber}
            onSave={(newValue) => handleSaveField("mobileNumber", newValue)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HodProfile;