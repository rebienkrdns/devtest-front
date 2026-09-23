import UserNavigation from "../../components/UserNavigation";

interface User {
    id: string;
    name: string;
    email: string;
}

interface Props {
    params: Promise<{ id: string }>;
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

export default async function UserDetailPage({ params }: Props) {
    const { id } = await params;
    const user = await getUserById(id);

    return (
        <div>
            <h1 className="text-center m-[5%] text-5xl">El ID del usuario es: #{user.id}</h1>
            <UserNavigation currentId={Number(user.id)} />
        </div>
    );
}
