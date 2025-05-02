import { auth } from "@/lib/auth";
import { db } from "@/database/db";
import { locations } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    console.log("POST /api/locations - Session:", session ? "Authenticated" : "Not authenticated");
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Parse request body
    const body = await request.json();
    const { title, location, description } = body;
    
    // Validate required fields
    if (!title || !location) {
      return NextResponse.json(
        { error: "Title and location are required" },
        { status: 400 }
      );
    }
    
    // Insert into database
    const newLocation = await db.insert(locations).values({
      title,
      location,
      description,
      user_id: session.user.id,
    }).returning();
    
    console.log("Created new location:", newLocation[0]);
    
    return NextResponse.json(newLocation[0], { status: 201 });
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json(
      { error: "Failed to create location", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    console.log("GET /api/locations - Session:", session ? "Authenticated" : "Not authenticated");
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get all locations for the current user
    const userLocations = await db
      .select()
      .from(locations)
      .where(eq(locations.user_id, session.user.id));
    
    console.log(`Found ${userLocations.length} locations for user ${session.user.id}`);
    
    return NextResponse.json(userLocations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}