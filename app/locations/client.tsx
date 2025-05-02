"use client";

import { useState } from "react";
import LocationList from "@/components/LocationList";
import LocationForm from "@/components/LocationForm";

type LocationsClientProps = {
  userId: string;
};

export default function LocationsClient({ userId }: LocationsClientProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleLocationAdded = () => {
    // Increment refresh trigger to cause LocationList to re-fetch
    setRefreshTrigger((prev) => prev + 1);
  };
  
  return (
    <div className="space-y-6">
      <LocationList key={refreshTrigger} userId={userId} />
      <LocationForm onLocationAdded={handleLocationAdded} userId={userId} />
    </div>
  );
}