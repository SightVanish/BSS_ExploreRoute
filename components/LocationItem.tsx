import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type LocationItemProps = {
  id: string;
  title: string;
  location: string;
  description?: string;
  onDelete?: (id: string) => void;
};

export default function LocationItem({
  id,
  title,
  location,
  description,
  onDelete,
}: LocationItemProps) {
  return (
    <div className="flex items-start justify-between p-4 border rounded-lg mb-2">
      {/* Removed hover:bg-gray-50 */}
      <div className="flex flex-col">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">Coordinates: {location}</p>
        {description && <p className="text-sm mt-1">{description}</p>}
      </div>
      
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash size={16} />
        </Button>
      )}
    </div>
  );
}