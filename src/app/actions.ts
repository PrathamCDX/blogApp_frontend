"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export default async function action() {
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
}
