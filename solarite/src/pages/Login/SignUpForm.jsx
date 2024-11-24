import {useLoginForm } from "../../hooks/useLoginForm"
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";



const SignUpForm = () => {
  const location = useLocation();
  const { state } = location;
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const gotToPath = (obj) => {navigate(obj.path, {state: obj.state})}

    const { setCurrentScreen, values, setValues, handleChangeValues, handleFormRegisterSubmit} = useLoginForm({user, setUser, state})
  return (
    <form onSubmit={handleFormRegisterSubmit}>
          <h2>Create New Account</h2>

          <span className="flex flex-col gap-2">
            <label>Email</label>
            <input
              required
              name="email"
              type="email"
              onChange={handleChangeValues}
              value={values.email}
            />
          </span>

          <span className="flex flex-col gap-2">
            <label>Password</label>
            <input
              required
              name="password"
              type="password"
              onChange={handleChangeValues}
              value={values.password}
            />
          </span>

          <span className="flex flex-col gap-2">
            <label>Confirm Password</label>
            <input
              required
              name="passwordConfirm"
              type="password"
              onChange={handleChangeValues}
              value={values.passwordConfirm}
            />
          </span>

          <Button label="Sign up" type="submit"/>

          
          <p>
            Already have an account?
            <a
              onClick={() => {
                console.log("clicked")
                setCurrentScreen(0);
                setValues({
                  email: "",
                  password: "",
                  passwordConfirm: "",
                });
                gotToPath({path: '/login', state: 'login'})
              }}
            >
              Log in
            </a>
          </p>
        </form>
  )
}

export default SignUpForm


