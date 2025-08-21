import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ProfileField from "@/components/shared/ProfileField";
import { dummyTutorProfile } from "@/data/dummyProfiles";

const TutorProfile = () => {
  const profile = dummyTutorProfile;

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
          <ProfileField label="Email">{profile.email}</ProfileField>
          <ProfileField label="Phone Number">{profile.phoneNumber}</ProfileField>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorProfile;