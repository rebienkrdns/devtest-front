import UserNavigation from "../components/UserNavigation";

interface User {
    id: string;
    name: string;
    email: string;
}

interface Props {
    params: { users: string[] };
}

async function getUsers(): Promise<User[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    return res.json();
}

async function getUserById(id: string): Promise<User> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Error al obtener el usuario ${id}`);
    }

    return res.json();
}

export default async function Users({ params }: Props) {
    const id = params?.users?.[0];

    if (id) {
        const user = await getUserById(id);
        return (
            <div>
                <h1 className="text-center m-[5%] text-5xl">El ID del usuario es: #{user.id}</h1>
                <UserNavigation currentId={Number(user.id)} />
            </div>
        );
    }

    const users = await getUsers();

    return (
        <div>
            <h1 className="text-center m-[5%] text-5xl">Usuarios</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="w-[20%] text-center">N°</th>
                        <th className="w-[40%] text-center">Nombre</th>
                        <th className="w-[40%] text-center">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="w-[20%] text-center">{user.id}</td>
                            <td className="w-[40%] text-center">{user.name}</td>
                            <td className="w-[40%] text-center">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
