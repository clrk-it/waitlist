"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Login Error:", error.message);
            redirect("/login?error=" + encodeURIComponent(error.message));
        }

        revalidatePath("/", "layout");
    } catch (err) {
        console.error("Unexpected Login Error:", err);
        const message = err instanceof Error ? err.message : "An unexpected error occurred";
        redirect("/login?error=" + encodeURIComponent(message));
    }

    redirect("/hidden");
}
