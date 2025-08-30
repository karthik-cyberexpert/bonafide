import DashboardCard from "@/components/shared/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchRequests, fetchStudentDetails, fetchTemplates } from "@/data/appData";
import { BonafideRequest, StudentDetails, CertificateTemplate } from "@/lib/types";
import { getStatusVariant, formatDateToIndian } from "@/lib/utils";
import { generatePdf, getCertificateHtml } from "@/lib/pdf";
import { CheckCircle, Download, FileText, Clock } from "lucide-react";
import { useSession } from "@/components/auth/SessionContextProvider";
import { useEffect, useState } from "react";
import { showError } from "@/utils/toast";

const StudentDashboard = () => {
  const { user } = useSession();
  const [studentRequests, setStudentRequests] = useState<BonafideRequest[]>([]);
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [templates, setTemplates] = useState<CertificateTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setLoading(true);
        const allRequests = await fetchRequests();
        const filteredRequests = allRequests.filter((req) => req.student_id === user.id);
        setStudentRequests(filteredRequests);

        const details = await fetchStudentDetails(user.id);
        setStudentDetails(details);

        const fetchedTemplates = await fetchTemplates();
        setTemplates(fetchedTemplates);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const totalRequests = studentRequests.length;
  const approvedRequests = studentRequests.filter(
    (req) => req.status === "Approved"
  );
  const pendingOrReturned = totalRequests - approvedRequests.length;

  const latestRequest = [...studentRequests].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  const handleDownload = async (request: BonafideRequest) => {
    if (!studentDetails) {
      showError("Student details not available for download.");
      return;
    }
    const template: CertificateTemplate | undefined = templates.find((t) => t.id === request.template_id);

    if (!template) {
      showError("Could not find template for download.");
      return;
    }

    if (template.template_type === "html") {
      const htmlContent = getCertificateHtml(request, studentDetails, template, true);
      const fileName = `Bonafide-${studentDetails.register_number}.pdf`;
      await generatePdf(htmlContent, fileName);
    } else if (template.file_url) {
      // For PDF or Word templates, directly download the file
      const link = document.createElement('a');
      link.href = template.file_url;
      link.download = `${template.name}-${studentDetails.register_number}.${template.template_type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      showError("No file URL found for this template type.");
      return;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Dashboard...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please wait while we fetch your dashboard data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Requests"
          value={totalRequests.toString()}
          icon={<FileText />}
          iconColor="text-cyan-500"
        />
        <DashboardCard
          title="Approved"
          value={approvedRequests.length.toString()}
          icon={<CheckCircle />}
          iconColor="text-emerald-500"
        />
        <DashboardCard
          title="Pending / Returned"
          value={pendingOrReturned.toString()}
          icon={<Clock />}
          iconColor="text-rose-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          {latestRequest ? (
            <Card>
              <CardHeader>
                <CardTitle>Latest Application Status</CardTitle>
                <CardDescription>
                  Details of your most recent request.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Request ID
                  </p>
                  <p className="font-semibold">{latestRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Type
                  </p>
                  <p className="font-semibold">{latestRequest.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Date Submitted
                  </p>
                  <p className="font-semibold">
                    {formatDateToIndian(latestRequest.date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge variant={getStatusVariant(latestRequest.status)}>
                    {latestRequest.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Requests Yet</CardTitle>
              </CardHeader>
              <CardContent>
                <p>You haven't submitted any bonafide requests.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Ready for Download</h2>
          {approvedRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {approvedRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{request.type}</CardTitle>
                    <CardDescription>
                      Approved on {formatDateToIndian(request.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      onClick={() => handleDownload(request)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              You have no approved certificates available for download.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;