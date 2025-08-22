import { useState, useEffect } from "react";
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
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CertificateTemplate } from "@/lib/types";
import { showSuccess, showError } from "@/utils/toast";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { createTemplate, deleteTemplate, fetchTemplates, updateTemplate } from "@/data/appData";

const TemplateManagement = () => {
  const [templates, setTemplates] =
    useState<CertificateTemplate[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [currentTemplate, setCurrentTemplate] = useState<
    Partial<CertificateTemplate>
  >({});
  const [loading, setLoading] = useState(true);

  const fetchTemplatesData = async () => {
    setLoading(true);
    const fetchedTemplates = await fetchTemplates();
    setTemplates(fetchedTemplates);
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplatesData();
  }, []);

  const handleOpenDialog = (
    mode: "create" | "edit",
    template?: CertificateTemplate
  ) => {
    setDialogMode(mode);
    setCurrentTemplate(template || { id: "", name: "", content: "" });
    setIsDialogOpen(true);
  };

  const handleSaveTemplate = async () => {
    if (!currentTemplate.name || !currentTemplate.content) {
      showError("Template name and content are required.");
      return;
    }

    if (dialogMode === "create") {
      const newTemplatePayload: Omit<CertificateTemplate, 'id' | 'created_at'> = {
        name: currentTemplate.name,
        content: currentTemplate.content,
      };
      const created = await createTemplate(newTemplatePayload);
      if (created) {
        showSuccess(`Template "${created.name}" created successfully.`);
        fetchTemplatesData();
      } else {
        showError("Failed to create template.");
      }
    } else {
      if (!currentTemplate.id) {
        showError("Template ID is missing for update.");
        return;
      }
      const updated = await updateTemplate(currentTemplate.id, {
        name: currentTemplate.name,
        content: currentTemplate.content,
      });
      if (updated) {
        showSuccess(`Template "${updated.name}" updated successfully.`);
        fetchTemplatesData();
      } else {
        showError("Failed to update template.");
      }
    }
    setIsDialogOpen(false);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    const templateName = templates.find((t) => t.id === templateId)?.name;
    const deleted = await deleteTemplate(templateId);
    if (deleted) {
      showSuccess(`Template "${templateName}" deleted successfully.`);
      fetchTemplatesData();
    } else {
      showError("Failed to delete template.");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Templates...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please wait while we fetch template data.</p>
        </CardContent>
      </Card>
    );
  }

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
            {templates.length > 0 ? (
              templates.map((template) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No templates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
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
                  setCurrentTemplate({
                    ...currentTemplate,
                    name: e.target.value,
                  })
                }
                placeholder="e.g., Standard Bonafide"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="template-content">Content</Label>
              <RichTextEditor
                content={currentTemplate.content || ""}
                onChange={(content) =>
                  setCurrentTemplate({ ...currentTemplate, content })
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use placeholders like {"{studentName}"}, {"{studentId}"}, etc.
              </p>
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