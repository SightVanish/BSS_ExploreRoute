"use client"

import { useState } from "react";
import { Todo } from "@/database/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleTodo } from "@/actions/todos";
import { useTransition } from "react";

export function TodoItem({ todo }: { todo: Todo }) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [completed, setCompleted] = useState(todo.completed);

    const handleToggle = () => {
        // Create form data with the todo ID
        const formData = new FormData();
        formData.append("id", todo.id.toString());

        setCompleted(!completed);

        startTransition(async () => {
            try {
                const result = await toggleTodo(formData);
                
                if (result && 'error' in result) {
                    // If there's an error, revert the optimistic update
                    setCompleted(completed);
                    setError(result.error || null);
                } else {
                    setError(null);
                }
            } catch (e) {
                // If there's an exception, revert the optimistic update
                setCompleted(completed);
                setError((e as Error).message || "An error occurred");
            }
        });
    };

    return (
        <li
            key={todo.id}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${
                isPending ? "opacity-70" : ""
            }`}
        >
            <Checkbox
                checked={completed}
                onCheckedChange={handleToggle}
                disabled={isPending}
            />
            <span className={`flex-1 ${completed ? "line-through text-muted-foreground" : ""}`}>
                {todo.title}
            </span>
            {error && (
                <span className="text-sm text-red-500">{error}</span>
            )}
        </li>
    );
}