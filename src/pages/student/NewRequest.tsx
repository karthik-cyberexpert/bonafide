import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { requests as appRequests } from "@/data/appData";
import { showSuccess, showError } from "@/utils/toast";
import { useNavigate } from "react-router-dom";

const NewRequest = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !reason) {
      showError("Please fill in all required fields.");
      return;
    }

    const newRequest = {
      id: `REQ${String(appRequests.length + 1).padStart(3, "0")}`,
      studentName: "Alice Johnson", // Hardcoded for demo
      studentId: "S12345", // Hardcoded for demo
      date: new Date().toISOString().split("T")[0],
      type,
      subType,
      reason,
      status: "Pending Tutor Approval" as const,
    };

    appRequests.unshift(newRequest);
    showSuccess("Request submitted successfully!");
    navigate("/student/my-requests");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>New Bonafide Certificate Request</CardTitle>
          <CardDescription>
            Fill out the form below to submit a new request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="student-name">Student Name</Label>
              <Input id="student-name" defaultValue="Alice Johnson" disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="student-id">Student ID</Label>
              <Input id="student-id" defaultValue="S12345" disabled />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bonafide-type">Type</Label>
                <Select onValueChange={setType} required>
                  <SelectTrigger id="bonafide-type">
                    <SelectValue placeholder="Select a bonafide type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Passport Application">
                      Passport Application
                    </SelectItem>
                    <SelectItem value="Bank Loan">Bank Loan</SelectItem>
                    <SelectItem value="Scholarship">Scholarship</SelectItem>
                    <SelectItem value="Internship Application">
                      Internship Application
                    </SelectItem>
                    <SelectItem value="Visa Application">
                      Visa Application
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sub-type">Sub-type (Optional)</Label>
                <Input
                  id="sub-type"
                  placeholder="e.g., Education Loan"
                  value={subType}
                  onChange={(e) => setSubType(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Certificate</Label>
              <Textarea
                id="reason"
                placeholder="Please provide any additional details here."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit">Submit Request</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewRequest;