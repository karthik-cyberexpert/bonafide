import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dummyTemplates } from "@/data/dummyTemplates";
import { CertificateTemplate } from "@/lib/types";
import { showSuccess } from "@/utils/toast";

const TemplateManagement = () => {
  const [templates, setTemplates] = useState<CertificateTemplate[]>(dummyTemplates);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [currentTemplate, setCurrentTemplate] = useState<Partial<CertificateTemplate>>({});

  const handleOpenDialog = (
    mode: "create" | "edit",
    template?: CertificateTemplate
  ) => {
    setDialogMode(mode);
    setCurrentTemplate(template || { id: "", name: "", content: "" });
    setIsDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (dialogMode === "create") {
      const newTemplate: CertificateTemplate = {
        id: `TPL${String(templates.length + 1).padStart(3, "0")}`,
        name: currentTemplate.name || "Untitled",
        content: currentTemplate.content || "",
      };
      setTemplates([...templates, newTemplate]);
      showSuccess(`Template "${newTemplate.name}" created successfully.`);
    } else {
      setTemplates(
        templates.map((t) =>
          t.id === currentTemplate.id ? { ...t, ...currentTemplate } : t
        )
      );
      showSuccess(`Template "${currentTemplate.name}" updated successfully.`);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const templateName = templates.find(t => t.id === templateId)?.name;
    setTemplates(templates.filter((t) => t.id !== templateId));
    showSuccess(`Template "${templateName}" deleted successfully.`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Template Management</CardTitle>
        <Button onClick={() => handleOpenDialog("create")}>
          Add New Template
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template ID</TableHead>
              <TableHead>Template Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.id}</TableCell>
                <TableCell>{template.name}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleOpenDialog("edit", template)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "create" ? "Create New" : "Edit"} Template
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={currentTemplate.name || ""}
                onChange={(e) =>
                  setCurrentTemplate({ ...currentTemplate, name: e.target.value })
                }
                placeholder="e.g., Standard Bonafide"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="template-content">Content</Label>
              <Textarea
                id="template-content"
                value={currentTemplate.content || ""}
                onChange={(e) =>
                  setCurrentTemplate({
                    ...currentTemplate,
                    content: e.target.value,
                  })
                }
                placeholder="Enter template content. Use placeholders like {studentName}, {studentId}, etc."
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveTemplate}>Save Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TemplateManagement;