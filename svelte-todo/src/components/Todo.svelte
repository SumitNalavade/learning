<script lang="ts">
  import { type ITodo } from "../utils/types";
  import IoIosCheckmark from 'svelte-icons/io/IoIosCheckmark.svelte'
  import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'
  import IoMdTrash from 'svelte-icons/io/IoMdTrash.svelte'

  export let todo: ITodo;
  export let handleDeleteTodo;
  export let handleFlipTodo;
</script>

<main class="flex justify-between items-center">
  <p class="p-4 m-2 bg-gray-100 rounded-lg w-full { todo.complete ? "line-through" : "" }">{todo.name}</p>

  <button on:click={() => handleFlipTodo(todo.id)} disabled={todo.complete} class="text-green-500 font-bold rounded flex items-center justify-center mx-2 w-10 bg-gray-100 disabled:opacity-50">
    <IoIosCheckmark />
  </button>

  <button on:click={() => handleFlipTodo(todo.id)} disabled={!todo.complete} class="text-red-500 font-bold rounded flex items-center justify-center mx-2 w-10 bg-gray-100 disabled:opacity-50">
    <IoIosClose />
  </button>

  <button on:click={() => handleDeleteTodo(todo.id)} class="text-red-500 font-bold rounded flex items-center justify-center mx-2 w-10 bg-gray-100 disabled:opacity-50">
    <IoMdTrash />
  </button>
</main>
