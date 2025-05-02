"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LocationFormProps = {
  onLocationAdded: () => void;
  userId: string;
};

export default function LocationForm({ onLocationAdded, userId }: LocationFormProps) {
  const [title, setTitle] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !coordinates) {
      setError("Title and coordinates are required");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          location: coordinates,
          description: description || undefined,
        }),
        credentials: "include", // Important: include cookies
      });
      
      console.log("Form submission response:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error response:", errorData);
        throw new Error(`Failed to add location: ${response.status} ${response.statusText}`);
      }
      
      // Reset form
      setTitle("");
      setCoordinates("");
      setDescription("");
      
      // Notify parent to refresh the list
      onLocationAdded();
    } catch (err) {
      console.error("Error adding location:", err);
      setError(`Failed to add location: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
      <h3 className="font-medium">Add New Location</h3>
      
      {error && <div className="text-sm text-red-500">{error}</div>}
      
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Location Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        
        <Input
          type="text"
          placeholder="Coordinates (lat,lng)"
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
          disabled={isSubmitting}
          className="font-mono"
        />
        
        <Input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Adding..." : "Add Location"}
      </Button>
    </form>
  );
}