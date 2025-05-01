"use server"

import { eq, and, sql} from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import { db } from "@/database/db"
import { todos } from "@/database/schema"

export async function createTodo(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;

    if (!title || title.trim() === "") {
        return {
            error: "Input your todo"
        };
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    await db.insert(todos).values({
        title,
        userId: session.user.id,
        completed: false,
    });

    revalidatePath("/todos");
    return { success: true };
}

export async function toggleTodo(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    const id = formData.get("id") as string;

    // Perform a single query that both verifies ownership and updates the todo
    // This is more secure and efficient than separate queries
    const result = await db
        .update(todos)
        .set({
            completed: sql`NOT ${todos.completed}`
        })
        .where(
            // Only update if the user is the owner of the todo
            and(
                eq(todos.id, id),
                eq(todos.userId, session.user.id)
            )
        )
        .returning();
    
    // If no rows were updated, the user didn't own the todo
    if (result.length === 0) {
        return {
            error: "You can only toggle your own todos"
        };
    }

    revalidatePath("/todos");
    return { success: true };
}

export async function deleteTodo(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    if (session.user.role !== "admin") {
        throw new Error("Forbidden - Admin access required");
    }

    const id = formData.get("id") as string;
    await db.delete(todos)
        .where(eq(todos.id, id));

    revalidatePath("/admin");
}