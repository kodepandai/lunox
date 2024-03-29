import Layout from "../components/Layout";
import type User from "../../app/Model/User";
import type { OnServer } from "@lunoxjs/core/contracts";
import { Request } from "@lunoxjs/core";
import { Head, Link } from "@lunoxjs/view-plugin-react";

export const onServer: OnServer = async (req?: Request) => {
  const user = (await req?.auth().user()) as User;
  return {
    full_name: user.full_name,
  };
};

const Admin = ({
  version = {},
  full_name,
}: {
  version: Record<string, string>;
  full_name: string;
}) => {
  return (
    <Layout version={version}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h2 className="rounded bg-green-400 p-2">Welcome {full_name}</h2>
      <div className="flex justify-center flex-row">
        <Link href="/logout" className="p-4 underline">
          Logout
        </Link>
        <Link href="/" className="p-4 underline">
          Home
        </Link>
      </div>
    </Layout>
  );
};

export default Admin;
