import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../features/user/userSlice";

const rootUrl = "https://jobify-prod.herokuapp.com/api/v1/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const { user, isLoading } = useSelector((store) => store.user);

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { isMember, name, email, password } = values;

    if (!isMember) {
      if (!name || !email || !password) {
        toast.error("Please input all the fields!");
        return;
      } else {
        dispatch(registerUser({ name, email, password }));
      }
    } else {
      if (!email || !password) {
        toast.error("Please input all the fields!");
        return;
      }
      dispatch(loginUser({ email, password }));
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);
  return (
    <Wrapper classname="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo></Logo>
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* name field */}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="name"
          ></FormRow>
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="email"
        ></FormRow>

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="password"
        ></FormRow>

        {/* password field */}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </button>

        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
        >
          {isLoading ? "loading..." : "demo"}
        </button>
        <p>
          {values.isMember ? "Not a member Yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>

        <p>Sign up or login using demo account</p>
        <p>Demo account doesn't offer full functionality!!!</p>
      </form>
    </Wrapper>
  );
}

export default Register;
