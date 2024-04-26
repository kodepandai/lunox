import { FormEventHandler } from "react";
import { Head, useForm, usePage } from "@lunoxjs/view-plugin-react";
import { Checkbox } from "$lib/components/ui/checkbox";
import { Button } from "$lib/components/ui/button";
import { TextInput } from "$lib/components/ui/text-input";
import { InputWrapper } from "$lib/components/ui/input-wrapper";

const Login = () => {
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post("/login");
  };

  const { data, setData, post, errors } = useForm({
    username: "",
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
        className="flex flex-col max-w-md w-60 mx-auto gap-4"
      >
        <input type="hidden" name="_token" value={csrf_token} />
        <TextInput
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          value={data.username}
          onChange={(e) => setData("username", e.target.value)}
          error={errors.username}
        />
        <TextInput
          type="password"
          name="password"
          label="Password"
          placeholder="password"
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
          error={errors.password}
        />

        <InputWrapper
          label="Remember me"
          htmlFor="remember_me"
          labelPosition="end"
          className="flex"
        >
          <Checkbox
            className="mr-1"
            name="remember"
            id="remember_me"
            placeholder="remember me"
            checked={data.remember}
            onCheckedChange={(v) => setData("remember", v as boolean)}
          />
        </InputWrapper>

        <Button type="submit">LOGIN</Button>
      </form>
    </>
  );
};

export const layout = "layout.base";
export default Login;
