import { redirect } from "next/navigation";

export default function SignUp() {
  // We have merged Login and Sign Up into the Master Auth Portal (/login) using the Antigravity glassmorphism schema.
  redirect("/login");
}
