import { redirect } from "next/navigation";
import { ROUTES } from "./_utils/routes";

export default async function Home() {
  redirect(ROUTES.LOGIN);
}
