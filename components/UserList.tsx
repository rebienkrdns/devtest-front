"use client";

import { useOptimistic, useRef, useState, useTransition } from "react";

import { createUser } from "@/app/users/actions";
import type { User } from "@/types/User";

const initialUsers: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", email: "grace@example.com" },
  { id: 3, name: "Alan Turing", email: "alan@example.com" },
];

export default function UserList() {
  const [users, setUsers] = useState(initialUsers);
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (currentUsers: User[], newUser: User) => [newUser, ...currentUsers],
  );
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const optimisticUser = {
      id: -Date.now(),
      name,
      email,
    };

    setError("");

    startTransition(async () => {
      addOptimisticUser(optimisticUser);

      try {
        const result = await createUser(formData);

        if (!result.success) {
          setError(result.error);
          return;
        }

        setUsers((currentUsers) => [result.user, ...currentUsers]);
        formRef.current?.reset();
      } catch {
        setError("The user could not be created. Try again.");
      }
    });
  }

  return (
    <main className="min-h-full flex-1 bg-slate-50 px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl" aria-labelledby="users-title">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Team directory
          </p>
          <h1 id="users-title" className="text-4xl font-bold tracking-tight sm:text-5xl">
            Users
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Add a user and see the interface update immediately while the server processes the request.
          </p>
        </header>

        <form
          ref={formRef}
          action={handleSubmit}
          className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-lg font-semibold">New user</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium" htmlFor="name">
              Name
              <input
                id="name"
                name="name"
                required
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-indigo-900"
                placeholder="Ada Lovelace"
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium" htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                required
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-indigo-900"
                placeholder="ada@example.com"
                type="email"
              />
            </label>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Saving..." : "Add user"}
            </button>
            <p aria-live="polite" className="text-sm text-slate-500 dark:text-slate-400">
              {isPending ? "Saving on the server..." : ""}
            </p>
          </div>
          {error ? (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}
        </form>

        <ul className="grid gap-3 sm:grid-cols-2" aria-label="Users list">
          {optimisticUsers.map((user) => (
            <li
              key={user.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="truncate text-lg font-semibold">{user.name}</h2>
              <p className="mt-2 break-all text-sm text-slate-600 dark:text-slate-400">
                {user.email}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
