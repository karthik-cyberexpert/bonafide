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
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for Certificate</Label>
            <Textarea
              id="reason"
              placeholder="e.g., Passport Application, Bank Loan"
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