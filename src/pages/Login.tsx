import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { HttpStatusCode } from "axios";
import { useCurrUser } from "@/utils/customHook";
import routes from "./routes";
import { axiosInstance, reqConfig } from "@/utils/axiosConfig";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/entities/user";
import Role from "@/entities/enums/Role";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email!" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character!" }),
});

type LoginForm = z.infer<typeof LoginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });
  const location = useLocation();
  const from: string = location.state?.from?.pathname ?? "/";
  const { setCurrUser } = useCurrUser();
  const [passwordVisibility, setPasswordvisibility] = useState(false);

  const handleLoginFormSubmission: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await axiosInstance.post<{
        message: string;
        info: User;
      }>(
        "/users/login",
        {
          email: data.email.trim(),
          password: data.password.trim(),
        },
        reqConfig
      );
      const user: User = res.data.info;
      setCurrUser(user);
      await routes.navigate(
        user.role === Role.ADMIN ? "/admin" : from === "/login" ? "/" : from,
        {
          unstable_viewTransition: true,
          replace: true,
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          setError("root", {
            message: "Please logout your current account!",
          });
        } else if (error.response?.status == HttpStatusCode.BadRequest) {
          setError("root", {
            message: "Account none exist!",
          });
        } else if (error.response?.status == HttpStatusCode.Unauthorized) {
          setError("password", {
            message: "Wrong password!",
          });
        } else {
          setError("root", {
            message: "This account currently cannot login!",
          });
        }
        // Handle error response if available
        console.error(`Error response: ${JSON.stringify(error.response)}`);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleEnterKeyEvent = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-2">
      <form
        onSubmit={handleSubmit(handleLoginFormSubmission)}
        className="flex items-center justify-center my-10"
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-bold dark:text-primary-light">
              Login
            </h1>
            <p className="text-balance text-muted-foreground mb-4">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2 mb-4">
              <Label
                htmlFor="email"
                className="font-medium text-xl dark:text-effect-light"
              >
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="abc@example.com"
                size={40}
                onKeyDown={(e) => handleEnterKeyEvent(e)}
                autoComplete="off"
              />
              {errors.email && (
                <div className="text-red-600">{errors.email.message}</div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="font-medium text-xl dark:text-effect-light"
                >
                  Password
                </Label>
                <NavLink
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm hover:underline dark:text-white"
                >
                  Forgot your password?
                </NavLink>
              </div>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  size={40}
                  onKeyDown={(e) => handleEnterKeyEvent(e)}
                  autoCorrect="off"
                />
                <button
                  className="cursor-pointer absolute right-3 bottom-2 text-gray-500 dark:text-cyan-500"
                  onClick={(e) => {
                    e.preventDefault();
                    setPasswordvisibility(!passwordVisibility);
                  }}
                >
                  {!passwordVisibility ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-600">{errors.password.message}</div>
              )}
            </div>
            <Button type="submit" variant="default" className="w-full mt-4">
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm dark:text-white">
            Don&apos;t have an account?{" "}
            <NavLink
              to="/signup"
              unstable_viewTransition={true}
              className="hover:underline text-cyan-500"
            >
              Sign up
            </NavLink>
          </div>
        </div>
      </form>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
