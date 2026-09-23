import Link from "next/link";

interface UserItemProps {
  id: number;
  name: string;
  email: string;
}

export default function UserItem({ id, name, email }: UserItemProps) {
  return (
    <li>
      <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800">
        <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
          <Link
            className="rounded-sm outline-offset-4 transition hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:text-indigo-400 dark:focus-visible:outline-indigo-400"
            href={`/users/${id}`}
          >
            {name}
          </Link>
        </h2>
        <a
          className="mt-2 block break-all text-sm text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-slate-400 dark:decoration-slate-700 dark:hover:text-indigo-400 dark:focus-visible:outline-indigo-400"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      </article>
    </li>
  );
}
