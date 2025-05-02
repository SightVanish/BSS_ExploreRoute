import { TodoList } from "@/components/TodoList";
import { db } from "@/database/db";
import { todos } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function TodosPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

  // if not signed in, show nothing
  if (!session) {
    return null;
  }

  const userTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, session.user.id));

  return (
    <main className="py-8 px-4">
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Todos</h1>
        <TodoList todos={userTodos} />
      </section>
    </main>
  );
}
