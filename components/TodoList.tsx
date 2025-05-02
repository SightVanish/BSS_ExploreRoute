"use client"

import { useRef, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Todo } from "@/database/schema"
import { createTodo } from "@/actions/todos"

import { TodoItem } from "./TodoItem"

export function TodoList({ todos }: { todos: Todo[] }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [optimisticTodos, setOptimisticTodos] = useState<Todo[]>(todos)
    
    // When todos prop changes, update optimistic todos
    if (JSON.stringify(todos) !== JSON.stringify(optimisticTodos.filter(t => !t.id.toString().startsWith('optimistic')))) {
        setOptimisticTodos(todos)
    }

    // Handle form submission with optimistic update
    const handleSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string
        
        // Skip empty titles
        if (!title || title.trim() === "") {
            setError("Todo title cannot be empty")
            return
        }
        
        // Add the todo optimistically
        const optimisticTodo: Todo = {
            id: `optimistic-${Date.now()}`,
            title: title,
            completed: false,
            userId: "optimistic-user",
            createdAt: new Date()
        } as Todo
        
        setOptimisticTodos(prev => [...prev, optimisticTodo])
        
        // Submit the form and handle response
        startTransition(async () => {
            try {
                const result = await createTodo(formData)
                
                if (result && 'error' in result) {
                    setError(result.error || null)
                } else {
                    setError(null)
                    formRef.current?.reset()
                }
            } catch (e) {
                setError((e as Error).message || "An error occurred")
            }
        })
    }

    return (
        <div className="space-y-4">
            <form 
                ref={formRef} 
                action={handleSubmit} 
                className="flex gap-2 items-stretch"
            >
                <div className="flex-1 space-y-1">
                    <Input
                        name="title"
                        placeholder="Add a new todo..."
                        aria-invalid={!!error}
                    />
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </div>
                <Button 
                    type="submit" 
                    disabled={isPending}
                >
                    {isPending ? "Adding..." : "Add"}
                </Button>
            </form>

            <ul className="space-y-2">
                {optimisticTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
}