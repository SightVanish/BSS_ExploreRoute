import { auth } from "@/lib/auth";
import { db } from "@/database/db";
import { locations } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function getLocationIdFromRequest(request: NextRequest): string | null {
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  return segments[segments.length - 1] || null;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const locationId = getLocationIdFromRequest(request);
    if (!locationId) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

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

    return NextResponse.json({ location: location[0] });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const locationId = getLocationIdFromRequest(request);
    if (!locationId) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const data = await request.json();

    await db
      .update(locations)
      .set(data)
      .where(
        and(
          eq(locations.id, locationId),
          eq(locations.user_id, session.user.id)
        )
      );

    return NextResponse.json({ message: "Location updated" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const locationId = getLocationIdFromRequest(request);
    if (!locationId) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await db
      .delete(locations)
      .where(
        and(
          eq(locations.id, locationId),
          eq(locations.user_id, session.user.id)
        )
      );

    return NextResponse.json({ message: "Location deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
