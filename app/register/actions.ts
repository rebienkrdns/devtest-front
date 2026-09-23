"use server";

export interface UserEntry {
    username: string;
    password?: string;
    pending?: boolean;
}

export async function addUser(user: UserEntry): Promise<UserEntry> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { username: user.username };
}
