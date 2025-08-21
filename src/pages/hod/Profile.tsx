import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyHodProfile } from "@/data/dummyProfiles";
import ProfileDetail from "@/components/shared/ProfileDetail";

const HodProfile = () => {
  const profile = dummyHodProfile;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileDetail label="Name" value={profile.name} />
        <ProfileDetail label="Department" value={profile.department} />
        <ProfileDetail label="Email" value={profile.email} />
        <ProfileDetail label="Mobile Number" value={profile.mobileNumber} />
      </CardContent>
    </Card>
  );
};

export default HodProfile;