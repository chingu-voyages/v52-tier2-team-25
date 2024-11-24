import { useLoginForm } from "@/hooks/useLoginForm";
import { Button } from "@/components/Button";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const gotToPath = (obj) => {
    navigate(obj.path, { state: obj.state });
  };
  const { user, setUser } = useAuth();
  const {
    setCurrentScreen,
    values,
    setValues,
    handleChangeValues,
    handleFormLoginSubmit,
  } = useLoginForm({ user, setUser, state });

  return (
    <form onSubmit={handleFormLoginSubmit} className="inline-flex flex-col justify-center py-2 px-10 bg-gray-100 rounded-xl">
      <h2 className="p-10 font-bold text-3xl text-sky-900 text-center">Login</h2>
      
      <span className="flex flex-col gap-2">
        <label className="text-[1.1em]">Email</label>
        <input
          required
          name="email"
          type="email"
          onChange={handleChangeValues}
          value={values.email}
          className="p-2 bg-white rounded text-md outline-sky-900"
        />
      </span>
      <br />
      <span className="flex flex-col gap-2">
        <label className="text-[1.1em]">Password</label>
        <input
          required
          name="password"
          type="password"
          onChange={handleChangeValues}
          value={values.password}
          className="p-2 bg-white rounded text-md outline-sky-900"
        />
      </span>
      <a className="pt-3 text-sky-900 flex text-right justify-end" href="https://tevintc.xyz/" target="_blank">Forgot password?</a>

      <br />

      <Button label="Login" type="submit" />

      <p>
        <span className="flex gap-1 items-center justify-center p-10">
          <p>Don&apos;t have an account?</p>
          <a
            onClick={() => {
              setCurrentScreen(1);
              setValues({
                email: "",
                password: "",
                passwordConfirm: "",
              });
              gotToPath({ path: "/login", state: "signup" });
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
