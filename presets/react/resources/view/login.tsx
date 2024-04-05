import { FormEventHandler } from "react";
import Input from "../components/Input";
import Layout from "../components/Layout";
import { Head, useForm, usePage } from "@lunoxjs/view-plugin-react";

const Login = () => {
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post("/login");
  };

  const { data, setData, post } = useForm({
    user_name: "",
    password: "",
    remember: false,
  });
  const { csrf_token } = usePage();
  return (
    <>
      <Head>
        <title>Lunox | Login</title>
      </Head>
    <form
      onSubmit={submit}
      action="/login"
      method="post"
      className="flex flex-col max-w-md w-200 mx-auto"
    >
      <input type="hidden" name="_token" value={csrf_token} />
      <Input
        type="text"
        name="user_name"
        placeholder="username"
        value={data.user_name}
        onChange={(e) => setData("user_name", e.target.value)}
      />
      <Input
        type="password"
        name="password"
        placeholder="password"
        value={data.password}
        onChange={(e) => setData("password", e.target.value)}
      />
      <div className="mb-3">
        <input
          type="checkbox"
          name="remember"
          placeholder="remember me"
          checked={data.remember}
          onChange={(e) => setData("remember", e.target.checked)}
        />
        <label htmlFor="remember" className="text-sm text-gray-800">
          Remember me
        </label>
      </div>
      <button className="bg-yellow-700 text-white rounded py-2"> LOGIN </button>
    </form>
    </>
  );
};
Login.layout = (page: any) => <Layout {...page.props}>{page}</Layout>;

export default Login;
