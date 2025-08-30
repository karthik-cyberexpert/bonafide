import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, X } from "lucide-react";

interface EditableProfileFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
}

const EditableProfileField = ({
  label,
  value,
  onSave,
}: EditableProfileFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2 mt-1">
        {isEditing ? (
          <>
            <Input
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="h-9"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSave}
              className="h-9 w-9 flex-shrink-0"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCancel}
              className="h-9 w-9 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <p className="text-base font-medium flex-grow">{value}</p>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-9 w-9 flex-shrink-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditableProfileField;