import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/guest-login");
  return null;
}
