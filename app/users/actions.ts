"use server";

import type { User } from "@/types/User";

type CreateUserResult =
  | { success: true; user: User }
  | { success: false; error: string };

export async function createUser(formData: FormData): Promise<CreateUserResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const name = formData.get("name");
  const email = formData.get("email");

  if (typeof name !== "string" || typeof email !== "string") {
    return { success: false, error: "Name and email are required." };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName || !trimmedEmail || !trimmedEmail.includes("@")) {
    return { success: false, error: "Enter a valid name and email." };
  }

  return {
    success: true,
    user: {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
    },
  };
}
