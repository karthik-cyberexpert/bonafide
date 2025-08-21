import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyAdminProfile } from "@/data/dummyProfiles";
import ProfileDetail from "@/components/shared/ProfileDetail";

const AdminProfile = () => {
  const profile = dummyAdminProfile;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileDetail label="Name" value={profile.name} />
        <ProfileDetail label="Email" value={profile.email} />
        <ProfileDetail label="Phone Number" value={profile.phoneNumber} />
      </CardContent>
    </Card>
  );
};

export default AdminProfile;