import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Batch } from "@/lib/types";
import { formatDateToIndian } from "@/lib/utils";
import { MoreHorizontal, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BatchCardProps {
  batch: Batch;
  onEdit: (batch: Batch) => void;
  onToggleStatus: (batchId: string) => void;
}

const BatchCard = ({ batch, onEdit, onToggleStatus }: BatchCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{batch.name}</CardTitle>
          <CardDescription>Assigned Tutor: {batch.tutor}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(batch)}>
              Edit Batch
            </DropdownMenuItem>
            <DropdownMenuItem>Assign Tutor</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleStatus(batch.id)}>
              {batch.status === "Active"
                ? "Mark as Inactive"
                : "Mark as Active"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <Badge variant={batch.status === "Active" ? "success" : "secondary"}>
            {batch.status}
          </Badge>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Current Semester</span>
          <span className="font-medium">{batch.currentSemester}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Semester Start</span>
          <span className="font-medium">
            {formatDateToIndian(batch.semesterFromDate)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Semester End</span>
          <span className="font-medium">
            {formatDateToIndian(batch.semesterToDate)}
          </span>
        </div>
        <Separator />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="sections">
            <AccordionTrigger className="text-sm pt-0">
              View Sections ({batch.sections.length})
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pt-2">
                {batch.sections.map((section) => (
                  <li
                    key={section.id}
                    className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded-md"
                  >
                    <div>
                      <p className="font-medium">Section {section.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {section.tutor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{section.studentCount}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          <span>{batch.studentCount} Students (Total)</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BatchCard;