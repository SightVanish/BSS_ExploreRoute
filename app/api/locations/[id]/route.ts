import { auth } from "@/lib/auth";
import { db } from "@/database/db";
import { locations } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const locationId = params.id;
    
    // Get the location and ensure it belongs to the current user
    const location = await db
      .select()
      .from(locations)
      .where(
        and(
          eq(locations.id, locationId),
          eq(locations.user_id, session.user.id)
        )
      )
      .limit(1);
    
    if (location.length === 0) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }
    
    return NextResponse.json(location[0]);
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const locationId = params.id;
    
    // Delete the location (ensuring it belongs to the current user)
    const deleted = await db
      .delete(locations)
      .where(
        and(
          eq(locations.id, locationId),
          eq(locations.user_id, session.user.id)
        )
      )
      .returning();
    
    if (deleted.length === 0) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json(
      { error: "Failed to delete location" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const locationId = params.id;
    const body = await request.json();
    const { title, location, description } = body;
    
    // Validate required fields
    if (!title && !location && !description) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }
    
    // Build update object with only provided fields
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (location !== undefined) updateData.location = location;
    if (description !== undefined) updateData.description = description;
    
    // Update the location (ensuring it belongs to the current user)
    const updated = await db
      .update(locations)
      .set(updateData)
      .where(
        and(
          eq(locations.id, locationId),
          eq(locations.user_id, session.user.id)
        )
      )
      .returning();
    
    if (updated.length === 0) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 }
    );
  }
}