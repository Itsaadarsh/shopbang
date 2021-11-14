import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from "axios";

import { ErrorData, ResponseData } from "interfaces";
import { api } from "constants";

interface Request {
  username: string;
  email: string;
  password: string;
  phoneno: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm },
    setError: setErrorForm,
  } = useForm<Request>({});

  const handleRegister = handleSubmitForm(
    async (formData: Request) => {
      axios.post(api + '/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneno: formData.phoneno
      }).then((response: AxiosResponse) => {
        const data: ResponseData = response.data;
        console.log(data.data.token);
        router.push("/");
      }).catch((error: AxiosError) => {
        const data: ErrorData = error?.response?.data;
        if (data.error) {
          data.data.message.forEach((e) => {
            if (e.param == "username") {
              setErrorForm("username", { message: e.msg });
            } else if (e.param == "email") {
              setErrorForm("email", { message: e.msg });
            } else if (e.param == "password") {
              setErrorForm("password", { message: e.msg });
            } else if (e.param == "phoneno") {
              setErrorForm("phoneno", { message: e.msg });
            } else {
              console.error("Error:", e.msg);
            }
          });
        } else {
          console.error("Error: Something went wrong.");
        }
      });
    }
  );

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form onSubmit={handleRegister}>
          <div>
            <h1 className="text-2xl font-bold">Create a new account</h1>
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
            {!!errorsForm.username && (
              <p className="text-sm text-red-500 pt-2">
                {errorsForm.username?.message}
              </p>
            )}
          </div>
          <div className="my-3">
            <input
              className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type="email"
              placeholder="Email"
              {...registerForm("email", {
                required: true,
              })}
            />
            {!!errorsForm.email && (
              <p className="text-sm text-red-500 pt-2">
                {errorsForm.email?.message}
              </p>
            )}
          </div>
          <div className="my-3">
            <input
              className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type="number"
              placeholder="Phone Number"
              {...registerForm("phoneno", {
                required: true,
              })}
            />
            {!!errorsForm.phoneno && (
              <p className="text-sm text-red-500 pt-2">
                {errorsForm.phoneno?.message}
              </p>
            )}
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
            {!!errorsForm.password && (
              <p className="text-sm text-red-500 pt-2">
                {errorsForm.password?.message}
              </p>
            )}
          </div>
          <div className="mt-5">
            <button className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">
              Register
            </button>
          </div>
        </form>
        <p className="mt-5">
          {" "}
          Already have an account?{" "}
          <Link href="/account/login">
            <a> Log in</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
