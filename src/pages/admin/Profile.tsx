import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/shared/ProfileHeader";
import EditableProfileField from "@/components/shared/EditableProfileField";
import { dummyAdminProfile } from "@/data/dummyProfiles";
import { AdminProfile as AdminProfileType } from "@/lib/types";
import ProfileField from "@/components/shared/ProfileField";

const AdminProfile = () => {
  const [profile, setProfile] = useState<AdminProfileType>(dummyAdminProfile);

  const handleSaveField = (field: keyof AdminProfileType, value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
    console.log(`Saving ${field}:`, value);
  };

  return (
    <Card>
      <CardHeader>
        <ProfileHeader name={profile.name} subtitle="Admin Profile Details" />
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ProfileField label="Username">{profile.username}</ProfileField>
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

export default AdminProfile;