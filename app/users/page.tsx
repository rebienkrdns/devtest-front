import UserItem from "@/components/UserItem";
import { User } from "@/types/User";

export default async function UsersPage() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);

  if (!res.ok) throw new Error("Failed to fetch users");

  const users: User[] = await res.json();

  return (
    <main className="min-h-full flex-1 bg-slate-50 px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl" aria-labelledby="users-title">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Directory
          </p>
          <h1 id="users-title" className="text-4xl font-bold tracking-tight sm:text-5xl">
            Users
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Browse the team directory and find the right contact.
          </p>
        </header>

        <ul className="grid gap-3 sm:grid-cols-2" aria-label="Users list">
          {users.map((user) => (
            <UserItem key={user.id} name={user.name} email={user.email} />
          ))}
        </ul>
      </section>
    </main>
  );
}
