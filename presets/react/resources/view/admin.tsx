import Layout from "../components/Layout";
import type User from "../../app/Model/User";
import type { OnServer } from "@lunoxjs/core/contracts";

export const onServer: OnServer = async (req) => {
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
      <h2 className="rounded bg-green-400 p-2">Welcome {full_name}</h2>
      <div className="flex justify-center flex-row">
        <a href="/logout" className="p-4 underline">
          Logout
        </a>
        <a href="/" className="p-4 underline">
          Home
        </a>
      </div>
    </Layout>
  );
};

export default Admin;
