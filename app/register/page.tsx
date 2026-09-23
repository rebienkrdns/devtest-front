import RegisterForm from "./RegisterForm";
import { type UserEntry } from "./actions";

const mockUsers: UserEntry[] = [
    { username: "Ana Gómez" },
    { username: "Carlos Pérez" },
    { username: "Lucía Fernández" },
];

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">Registro de Usuario</h1>
            <RegisterForm initialUsers={mockUsers} />
        </div>
    );
}