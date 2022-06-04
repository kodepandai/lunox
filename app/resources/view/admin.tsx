import Layout from "../components/Layout";
import type User from "app/Model/User";
import type { ObjectOf, OnServer } from "lunox";

export const onServer: OnServer = async (req) => {
  return {
    user: await req.auth().user(),
  };
};

const Admin = ({
  version = {},
  user,
}: {
  version: ObjectOf<string>;
  user: User;
}) => {
  return (
    <Layout version={version}>
      <h2 className="rounded bg-green-400 p-2">Welcome {user?.fullname}</h2>
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
