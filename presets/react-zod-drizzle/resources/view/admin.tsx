import { Head, Link } from "@lunoxjs/view-plugin-react";
import type { users } from "database/schema";

const Admin = ({ user }: { user: typeof users.$inferSelect }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h2 className="rounded bg-green-400 p-2">
        Welcome {user.first_name} {user.last_name}
      </h2>
      <div className="flex justify-center flex-row">
        <Link href="/logout" className="p-4 underline">
          Logout
        </Link>
        <Link href="/" className="p-4 underline">
          Home
        </Link>
      </div>
    </>
  );
};

export const layout = "layout.base";
export default Admin;
