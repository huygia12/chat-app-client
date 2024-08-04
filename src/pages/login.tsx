import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { HttpStatusCode } from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { FC, ReactElement, useState } from "react";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";
import LoginSchema, { LoginFormProps } from "@/schema/login-form-schema";
import { useAuth } from "@/hooks";

const Login: FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(LoginSchema),
  });
  const [passwordVisibility, setPasswordvisibility] = useState(false);
  const { login } = useAuth();

  const handleLoginFormSubmission: SubmitHandler<LoginFormProps> = async (
    data
  ) => {
    try {
      await login(data, true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.NotFound) {
          setError("email", {
            message: "Account none exist!",
          });
        } else if (
          error.response?.status == HttpStatusCode.UnprocessableEntity
        ) {
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
        setError("root", {
          message: "This account currently cannot login!",
        });
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
    <div className="w-full h-full flex flex-col 2xl:grid 2xl:grid-cols-2 dark:bg-bkg-2-dark">
      <DarkModeToggle />
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
                defaultValue={"toan@gmail.com"}
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
                  defaultValue={"12345678"}
                  id="password"
                  type={passwordVisibility ? "text" : "password"}
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
            {errors.root && (
              <div className="text-red-600">{errors.root.message}</div>
            )}
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="text-center text-sm dark:text-white">
            Don&apos;t have an account?{" "}
            <NavLink
              to="/signup"
              unstable_viewTransition
              className="hover:underline text-cyan-500"
            >
              Sign up
            </NavLink>
          </div>
        </div>
      </form>
      <div className="hidden bg-muted xl:block">
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
