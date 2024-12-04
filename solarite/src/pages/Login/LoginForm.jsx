import { useLoginForm } from "@/hooks/useLoginForm";
import { Button } from "@/components/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/inputs/Input";

const LoginForm = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const { values, setValues, handleChangeValues, handleFormLoginSubmit } =
    useLoginForm({ user, setUser });

  return (
    <form
      onSubmit={handleFormLoginSubmit}
      className="inline-flex flex-col justify-center px-10 py-2 bg-gray-100 rounded-xl"
    >
      <h2 className="p-10 text-3xl font-bold text-center text-sky-900">
        Login
      </h2>

      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChangeValues}
      />
      <br />
      <Input
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChangeValues}
      />

      <a
        className="flex justify-end pt-3 text-right text-sky-900"
        href="https://tevintc.xyz/"
        target="_blank"
      >
        Forgot password?
      </a>

      <br />

      <Button label="Login" type="submit" />

      <p>
        <span className="flex gap-1 justify-center items-center p-10">
          <p>Don&apos;t have an account?</p>
          <a
            onClick={() => {
              setValues({
                email: "",
                password: "",
                passwordConfirm: "",
              });
              navigate("/register");
            }}
            className="font-semibold hover:text-sky-900"
          >
            Sign Up
          </a>
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
