"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function ToasterClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const created = params.get("created");
    const deleted = params.get("deleted");
    const edited = params.get("edited");

    if (created) {
      setMsg("User created successfully.");
      const p = new URLSearchParams(params.toString());
      p.delete("created");
      router.replace("/?" + p.toString());
    } else if (deleted) {
      setMsg("User deleted successfully.");
      const p = new URLSearchParams(params.toString());
      p.delete("deleted");
      router.replace("/?" + p.toString());
    } else if (edited) {
      setMsg("User edited successfully.");
      const p = new URLSearchParams(params.toString());
      p.delete("edited");
      router.replace("/?" + p.toString());
    }
  }, [params, router]);

  if (!msg) return null;
  return <Toast message={msg} onClose={() => setMsg(null)} />;
}
