"use server";

import { revalidatePath } from "next/cache";
import { createUser, deleteUser, editUser } from "@/lib/users";

export async function createUserAction(formData) {
  const payload = {
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    website: formData.get("website"),
    address: {
      street: formData.get("street"),
      suite: formData.get("suite"),
      city: formData.get("city"),
      zipcode: formData.get("zipcode"),
      geo: {
        lat: formData.get("lat"),
        lng: formData.get("lng"),
      },
    },
    company: {
      name: formData.get("companyName"),
      catchPhrase: formData.get("catchPhrase"),
      bs: formData.get("bs"),
    },
  };

  const created = await createUser(payload);

  revalidatePath("/");

  return { ok: true, created };
}

export async function deleteUserAction(id) {
  await deleteUser(id);
  revalidatePath("/");
  return { ok: true, id };
}

export async function editUserAction(id, formData) {
  const payload = {
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    website: formData.get("website"),
    address: {
      street: formData.get("street"),
      suite: formData.get("suite"),
      city: formData.get("city"),
      zipcode: formData.get("zipcode"),
      geo: {
        lat: formData.get("lat"),
        lng: formData.get("lng"),
      },
    },
    company: {
      name: formData.get("companyName"),
      catchPhrase: formData.get("catchPhrase"),
      bs: formData.get("bs"),
    },
  };

  const edited = await editUser(id, payload);

  revalidatePath("/");

  return { ok: true, edited };
}
