import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from "axios";

import { ErrorData, ResponseData, Store } from "interfaces";

import api from "constants";

interface Request {
  username: string;
  password: string;
}

const LoginPage = ({ store }: { store: Store }) => {
  const router = useRouter();
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
  } = useForm<Request>({});

  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin = handleSubmitForm(
    async (formData: Request) => {
      setErrors([]);
      axios.post(api + '/login', {
        username: formData.username,
        password: formData.password,
      }).then((response: AxiosResponse) => {
        const data: ResponseData = response.data;
        store.login(formData.username, data.data.token);
      }).catch((error: AxiosError) => {
        const data: ErrorData = error?.response?.data;
        setErrors(data.data.message);
      });
    }
  );

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form onSubmit={handleLogin}>
          <div>
            <h1 className="text-2xl font-bold">Login to your account</h1>
          </div>
          <div className="mt-5">
            <input
              className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type="text"
              placeholder="Username"
              {...registerForm("username", {
                required: true,
              })}
            />
          </div>
          <div className="my-3">
            <input
              className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type="password"
              placeholder="Password"
              {...registerForm("password", {
                required: true,
              })}
            />
          </div>
          <div className="my-5">
            <button className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">
              Login
            </button>
          </div>
          {
            errors.map((error) =>
              <p key={error} className="text-sm text-red-500 mt-3">
                {error}
              </p>
            )
          }
        </form>
        <p className="mt-5">
          {" "}
          Dont have an account?{" "}
          <Link href="/account/register">
            <a> Register</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
