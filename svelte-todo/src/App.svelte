<script lang="ts">
  import TailwindCss from "./TailwindCSS.svelte";
  import { type ITodo } from "./utils/types";
  import Todo from "./components/Todo.svelte";
  import IoIosCheckmark from "svelte-icons/io/IoIosCheckmark.svelte";
  import { v4 as uuid } from "uuid";

  let todos: ITodo[] = [];

  let todoName = "";

  const handleAddTodo = (evt: SubmitEvent) => {
    evt.preventDefault();

    if (todoName.length < 1) return;

    todos = [...todos, { name: todoName, complete: false, id: uuid() }];

    todoName = "";
  };

  export const handleFlipTodo = (todoId: string) => {
    todos = todos.map((todo) => (todo.id === todoId ? { ...todo, complete: !todo.complete } : todo));
  };

  export const handleDeleteTodo = (todoId: string) => {
    todos = todos.filter((todo) => todo.id !== todoId);
  };
</script>

<main class="bg-gradient-to-br from-orange-200 to-pink-300">
  <TailwindCss />
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-between xl:w-2/5 m-4 h-4/5 bg-white p-6 rounded-lg">
      <div class="flex flex-col h-full overflow-y-auto">
        <img
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--be3eR7Dm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://nunomalex.me/svelte-logo.png"
          class="w-1/3 self-center"
          alt="Svelte Logo"
        />

        <h1 class="text-center">To-Do List</h1>

        <div class="mt-6 h-full">
          {#each todos as todo}
            <Todo {todo} {handleDeleteTodo} {handleFlipTodo} />
          {/each}
        </div>
      </div>

      <form on:submit={handleAddTodo} class="flex items-center justify-around w-full my-2">
        <input bind:value={todoName} type="text" class="px-4 py-2 border border-gray-300 rounded-lg w-full" placeholder="Do the dishes..." />
        <button class="text-green-500 bg-gray-100 font-bold px-4 rounded p-2 flex items-center justify-center mx-2 w-14">
          <IoIosCheckmark />
        </button>
      </form>
    </div>
  </div>
</main>

<style>
</style>
