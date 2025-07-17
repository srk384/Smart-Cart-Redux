import { useState } from "react";
import { toast } from "react-toastify";
import {
  useUserSignupMutation,
  useUserSigninMutation,
} from "../redux/APIs/productDataApi";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/productDataSlice";
import { useSelector, useDispatch } from "react-redux";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.productData);
  const [signup, setSignup] = useState(false);
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    // name: false,
    // email: false,
    // confirmPassword: false,
    // userexist: false,
  });

  const [userSignup] = useUserSignupMutation();
  const [userSignin] = useUserSigninMutation();

  //toast
  const notify = () => toast("User registered successfully!");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignUpForm({ ...signUpForm, [name]: value });
    setSignInForm({ ...signInForm, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError({ confirmPassword: true });
      return;
    } else if (!signUpForm.name) {
      setError({ name: true });
      return;
    } else if (!signUpForm.email) {
      setError({ email: true });
      return;
    } else if (!signUpForm.password) {
      setError({ password: true });
      return;
    }

    try {
      const { user, token } = await userSignup(signUpForm).unwrap();
      localStorage.setItem("token", token);
      console.log("User created:", user);
      console.log("User token:", token);
      setError({});
      if (user) {
        notify();
        setSignup(false)
      }
    } catch (err) {
      console.error("RTK error:", err);

      if (err?.status === 401) {
        setError({ userexist: true });
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!signInForm.email) {
      setError({ email: true });
      return;
    } else if (!signInForm.password) {
      setError({ password: true });
      return;
    }

    try {
      const { token, user } = await userSignin(signInForm).unwrap();
      localStorage.setItem("token", token);
      setError({});
      if (user) {
        dispatch(setUser(user));
        navigate("/profile");
        window.location.reload(false);
      }
    } catch (err) {
      console.error("RTK error:", err);

      if (err?.data?.error?.includes("User does not exist")) {
        setError({ incorrectEmail: true });
      }
      if (err?.data?.error?.includes("Incorrect Password")) {
        setError({ incorrectPassword: true });
      }
    }
  };

  return (
    <div
      className={`mx-auto ${signup ? "min-h-[calc(100vh-328px-80px-40px)]" : "min-h-[calc(100vh-328px-80px-80px)]"} max-w-xl`}
    >
      {/* login from */}
      {!signup && (
        <div className="my-20 rounded-md border border-neutral-300 bg-white px-16 py-12 shadow-md">
          <h1 className="mb-6 text-2xl font-bold">Sign In</h1>
          <form
            onSubmit={handleSignIn}
            method="post"
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="rounded-md border border-neutral-300 p-3"
              onChange={handleChange}
            />
            {error.email && (
              <div className="font-semibold text-red-600">
                Email is required
              </div>
            )}
            {error.incorrectEmail && (
              <div className="font-semibold text-red-600">
                Email does not exist
              </div>
            )}

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="rounded-md border border-neutral-300 p-3"
              onChange={handleChange}
            />
            {error.password && (
              <div className="font-semibold text-red-600">
                Password is required
              </div>
            )}
            {error.incorrectPassword && (
              <div className="font-semibold text-red-600">
                Password is incorrect
              </div>
            )}
            <input
              type="submit"
              value="Sign In"
              name=""
              id="submitBtn"
              className="cursor-pointer rounded-md border border-neutral-300 bg-[#fe5156] p-2 font-semibold text-white"
            />
          </form>
          <p className="mt-8 text-neutral-700">
            New to SmartCart ?{" "}
            <span
              className="cursor-pointer pl-1 font-bold text-[#fe5156] underline-offset-2 hover:underline"
              onClick={() => setSignup(true)}
            >
              Sign up now.
            </span>
          </p>
        </div>
      )}

      {/* Sign up form */}
      {signup && (
        <div className="mt-10 rounded-md border border-neutral-300 bg-white px-16 py-12 shadow-md">
          <h1 className="mb-6 text-2xl font-bold">Sign Up</h1>
          <form
            onSubmit={handleSignUp}
            method="post"
            className="flex flex-col gap-4"
          >
            <input
              type="Name"
              name="name"
              id="name"
              placeholder="Name"
              className="rounded-md border border-neutral-300 p-3"
              onChange={handleChange}
            />
            {error.name && (
              <div className="font-semibold text-red-600">Name is required</div>
            )}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="rounded-md border border-neutral-300 p-3"
              onChange={handleChange}
            />
            {error.email && (
              <div className="font-semibold text-red-600">
                Email is required
              </div>
            )}

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="rounded-md border border-neutral-300 p-3"
              onChange={handleChange}
            />
            {error.password && (
              <div className="font-semibold text-red-600">
                Password is required
              </div>
            )}
            <input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="rounded-md border border-neutral-300 p-3"
              onChange={handleChange}
            />
            {error.confirmPassword && (
              <div className="font-semibold text-red-600">
                Password does not match
              </div>
            )}
            {error.userexist && (
              <div className="font-semibold text-red-600">
                User already exist, Please Sign In.
              </div>
            )}
            <input
              type="submit"
              value="Sign Up"
              name=""
              id="submitBtn"
              className="cursor-pointer rounded-md border border-neutral-300 bg-[#fe5156] p-2 font-semibold text-white"
            />
          </form>
          <p className="mt-8 text-neutral-700">
            Already have an account ?{" "}
            <span
              className="cursor-pointer pl-1 font-bold text-[#fe5156] underline-offset-2 hover:underline"
              onClick={() => setSignup(false)}
            >
              Sign in now.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
