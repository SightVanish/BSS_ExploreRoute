"use client";

import { useState, useEffect } from "react";
import LocationItem from "./LocationItem";
import { Button } from "@/components/ui/button";

type Location = {
  id: string;
  title: string;
  location: string;
  description?: string;
  user_id: string;
};

export default function LocationList({ userId }: { userId: string }) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/locations");
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error response:", errorData);
        throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Locations data:", data);
      setLocations(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error in fetchLocations:", err);
      setError(`Error loading locations: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/locations/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete location: ${response.status}`);
      }
      
      // Remove from local state
      setLocations(locations.filter((location) => location.id !== id));
    } catch (err) {
      console.error("Error deleting location:", err);
      setError(`Failed to delete location: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  if (isLoading) {
    return <div className="p-4">Loading locations...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
        <Button onClick={fetchLocations} className="ml-2">
          Retry
        </Button>
      </div>
    );
  }

  if (locations.length === 0) {
    return <div className="p-4 text-gray-500">No locations found. Add one below!</div>;
  }

  return (
    <div className="space-y-2">
      {locations.map((location) => (
        <LocationItem
          key={location.id}
          id={location.id}
          title={location.title}
          location={location.location}
          description={location.description}
          onDelete={deleteLocation}
        />
      ))}
    </div>
  );
}