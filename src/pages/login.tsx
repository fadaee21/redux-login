import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hookStore";
import { login, reset, selectAuth } from "../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isError, isLoading, isSuccess, err, user } =
    useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(err?.message);
      console.log(err);
    }
  }, [isError, err]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password && !email) {
      toast.error("password and email is required");
    }
    dispatch(login({ email, password }));
    setPassword("");
    setEmail("");
    reset();
  };

  if (isLoading) {
    return <Spinner />;
  }

  const content = user?.user ? (
    <Navigate to={"/cart"} replace />
  ) : (
    <form className="max-w-xs mx-auto" onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-orange-700 font-bold mb-2">
          email
        </label>
        <input
          type="text"
          id="email"
          className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-orange-700 font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
  return content;
};

export default Login;