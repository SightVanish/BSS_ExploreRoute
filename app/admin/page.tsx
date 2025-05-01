import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/database/db";
import { todos } from "@/database/schema";
import { deleteTodo } from "@/actions/todos";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Check if user is authenticated and has admin role
  if (!session || session.user.role !== "admin") {
    return null;
  }

  // Fetch all todos for admin view
  const allTodos = await db.select().from(todos);

  return (
    <main className="py-8 px-4">
      <section className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All Todos</h2>
          <ul className="space-y-2">
            {allTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between rounded-lg border px-4 py-2"
              >
                <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                  {todo.title}
                </span>
                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button
                    type="submit"
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}