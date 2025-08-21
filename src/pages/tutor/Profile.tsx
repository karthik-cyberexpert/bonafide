import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyTutorProfile } from "@/data/dummyProfiles";
import ProfileDetail from "@/components/shared/ProfileDetail";

const TutorProfile = () => {
  const profile = dummyTutorProfile;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileDetail label="Name" value={profile.name} />
        <ProfileDetail label="Department" value={profile.department} />
        <ProfileDetail label="Batch Assigned" value={profile.batchAssigned} />
        <ProfileDetail label="Email" value={profile.email} />
        <ProfileDetail label="Phone Number" value={profile.phoneNumber} />
      </CardContent>
    </Card>
  );
};

export default TutorProfile;