import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileField from "@/components/shared/ProfileField";
import { dummyHodProfile } from "@/data/dummyProfiles";
import { HodProfile as HodProfileType } from "@/lib/types";

const HodProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<HodProfileType>(dummyHodProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(dummyHodProfile);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <ProfileHeader name={profile.name} subtitle="HOD Profile Details" />
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ProfileField label="Department">{profile.department}</ProfileField>

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
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  value={profile.mobileNumber}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <>
              <ProfileField label="Email">{profile.email}</ProfileField>
              <ProfileField label="Mobile Number">
                {profile.mobileNumber}
              </ProfileField>
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

export default HodProfile;