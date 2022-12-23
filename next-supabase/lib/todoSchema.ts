import { z } from "zod";

const Todo = z.object({
    id: z.string().uuid(),
    created_at: z.string().datetime(),
    name: z.string(),
    user_id: z.string().uuid(),
    complete: z.boolean()
});

type Todo = z.infer<typeof Todo>;

export default Todo;
