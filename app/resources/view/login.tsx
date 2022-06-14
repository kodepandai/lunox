import { csrf_token, old, session } from "lunox/client";
import { useEffect } from "react";
import Input from "../components/Input";
import Layout from "../components/Layout";

const Login = ({ version = {} }) => {
  useEffect(() => {
    // show message from flashed session
    if (session("message")) {
      alert(session("message"));
    }
  });
  return (
    <Layout version={version}>
      <form
        action="/login"
        method="post"
        className="flex flex-col max-w-md w-200 mx-auto"
      >
        <input type="hidden" name="_token" value={csrf_token()} />
        <Input
          type="text"
          name="username"
          placeholder="username or email"
          defaultValue={old("username")}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          defaultValue={old("password")}
        />
        <div className="mb-3">
          <input type="checkbox" name="remember" placeholder="remember me" />
          <label htmlFor="remember" className="text-sm text-gray-800">
            Remember me
          </label>
        </div>
        <button className="bg-yellow-700 text-white rounded py-2">
          {" "}
          LOGIN{" "}
        </button>
      </form>
    </Layout>
  );
};

export default Login;
