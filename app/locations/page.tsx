import LocationsClient from "./client";
import { auth } from "@/lib/auth";  // Changed from getAuth to auth
import { redirect } from "next/navigation";
import { headers } from "next/headers";  // Added headers import

export default async function LocationsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  // Redirect to sign in if not authenticated
  if (!session) {
    return null;  // Matching your todos implementation
  }
  
  return (
    <main className="py-8 px-4">
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Locations</h1>
        <LocationsClient userId={session.user.id} />
      </section>
    </main>
  );
}