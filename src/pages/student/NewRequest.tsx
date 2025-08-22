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

const NewRequest = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Bonafide Certificate Request</CardTitle>
        <CardDescription>
          Fill out the form below to submit a new request.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
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
              <Select>
                <SelectTrigger id="bonafide-type">
                  <SelectValue placeholder="Select a bonafide type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport Application</SelectItem>
                  <SelectItem value="bank-loan">Bank Loan</SelectItem>
                  <SelectItem value="scholarship">Scholarship</SelectItem>
                  <SelectItem value="internship">
                    Internship Application
                  </SelectItem>
                  <SelectItem value="visa">Visa Application</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sub-type">Sub-type (Optional)</Label>
              <Input id="sub-type" placeholder="e.g., Education Loan" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for Certificate</Label>
            <Textarea
              id="reason"
              placeholder="Please provide any additional details here."
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Submit Request</Button>
      </CardFooter>
    </Card>
  );
};

export default NewRequest;