import { Head, Link } from "@lunoxjs/view-plugin-react";
import type User from "app/Model/User";


const Admin = ({
  user,
}: {
  user: User;
}) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h2 className="rounded bg-green-400 p-2">Welcome {user.full_name}</h2>
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
