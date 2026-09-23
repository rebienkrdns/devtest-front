"use client";

import { useState, useOptimistic, useTransition, useRef } from "react";
import { addUser, type UserEntry } from "./actions";

interface Props {
    initialUsers: UserEntry[];
}

export default function RegisterForm({ initialUsers }: Props) {
    const [users, setUsers] = useState<UserEntry[]>(initialUsers);
    const [optimisticUsers, addOptimisticUser] = useOptimistic(
        users,
        (state, newUser: UserEntry) => [...state, { ...newUser, pending: true }]
    );
    const [, startTransition] = useTransition();
    const [countdown, setCountdown] = useState<number | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    function startCountdown() {
        setCountdown(2);
        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev === null || prev <= 1) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    function stopCountdown() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCountdown(null);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!username.trim()) return;

        const newUser: UserEntry = { username, password };

        setUsername("");
        setPassword("");

        startCountdown();

        startTransition(async () => {
            addOptimisticUser(newUser);
            try {
                const saved = await addUser(newUser);
                setUsers((prev) => [...prev, saved]);
            } catch {
            } finally {
                stopCountdown();
            }
        });
    }

    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm mb-8">
                <input
                    className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={countdown !== null}
                />
                <input
                    className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={countdown !== null}
                />
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    type="submit"
                    disabled={countdown !== null}
                >
                    {countdown !== null ? "Guardando..." : "Registrar"}
                </button>
            </form>

            <h2 className="text-2xl font-semibold mb-4">Usuarios registrados</h2>
            <ul className="w-full max-w-sm space-y-2">
                {optimisticUsers.map((user, i) => (
                    <li
                        key={i}
                        className={`px-4 py-2 border rounded flex justify-between items-center transition-opacity ${user.pending ? "opacity-50 border-dashed border-blue-400" : "border-gray-200"
                            }`}
                    >
                        <span>{user.username}</span>
                        {user.pending && (
                            <span className="text-xs text-blue-500 italic">guardando...</span>
                        )}
                    </li>
                ))}
            </ul>

            {countdown !== null && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-4 text-sm">
                    <span className="text-2xl font-bold tabular-nums text-blue-400">{countdown}</span>
                    <span>Guardando usuario en el servidor...</span>
                </div>
            )}
        </div>
    );
}
