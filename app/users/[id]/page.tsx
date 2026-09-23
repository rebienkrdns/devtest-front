import { notFound } from "next/navigation";
import Link from "next/link";

import { User } from "@/types/User";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const user: User = await response.json();

  return (
    <main className="min-h-full flex-1 bg-slate-50 px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <Link
          className="text-sm font-semibold text-indigo-600 underline underline-offset-4 hover:text-indigo-500 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 dark:focus-visible:outline-indigo-400"
          href="/users"
        >
          Back to users
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          User profile
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{user.name}</h1>
        <a
          className="mt-4 block text-base text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-indigo-600 dark:text-slate-400 dark:decoration-slate-700 dark:hover:text-indigo-400"
          href={`mailto:${user.email}`}
        >
          {user.email}
        </a>
      </article>
    </main>
  );
}
