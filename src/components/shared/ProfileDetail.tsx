interface ProfileDetailProps {
  label: string;
  value: string;
}

const ProfileDetail = ({ label, value }: ProfileDetailProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 items-center">
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="md:col-span-2 text-sm">{value}</p>
  </div>
);

export default ProfileDetail;