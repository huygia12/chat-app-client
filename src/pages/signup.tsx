import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import routes from "./routes";
import { axiosInstance, reqConfig } from "@/utils/axios-config";
import axios, { HttpStatusCode } from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Gender from "@/entities/enums/gender";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { z } from "zod";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";

const SignupSchema = z.object({
  userName: z.string().min(1, { message: "Name is required!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email!" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required!" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character!" }),
  birthDay: z.string().min(1, { message: "Birthday is required!" }),
});

type SignupForm = z.infer<typeof SignupSchema>;

const Signup = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
  });
  const [date, setDate] = useState<Date>();
  const [passwordVisibility, setPasswordvisibility] = useState(false);

  const handleSignupFormSubmission: SubmitHandler<SignupForm> = async (
    data
  ) => {
    try {
      await axiosInstance.post(
        "/users/signup",
        {
          name: data.userName.trim(),
          email: data.email.trim(),
          password: data.password.trim(),
          role: "USER",
        },
        reqConfig
      );

      await routes.navigate("/login", { unstable_viewTransition: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          setError("email", {
            message: "Email đã được sử dụng!",
          });
        } else {
          setError("root", {
            message: "Đăng ký thất bại!",
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
    <div className="w-full h-full flex flex-col 2xl:grid 2xl:grid-cols-2 dark:bg-bkg-2-dark">
      <DarkModeToggle />
      <form
        onSubmit={handleSubmit(handleSignupFormSubmission)}
        className="flex items-center justify-center my-10"
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-bold dark:text-primary-light">
              Signup
            </h1>
            <p className="text-balance text-muted-foreground mb-4">
              Enter your information below to signup
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="username"
                className="font-normal text-xl dark:text-effect-light"
              >
                User name
              </Label>
              <Input
                {...register("userName")}
                id="username"
                type="text"
                placeholder="abc"
                size={40}
                onKeyDown={(e) => handleEnterKeyEvent(e)}
                autoComplete="off"
              />
              {errors.userName && (
                <div className="text-red-600">{errors.userName.message}</div>
              )}
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label
                    htmlFor="firstname"
                    className="font-normal text-xl dark:text-effect-light"
                  >
                    First name
                  </Label>
                  <Input
                    {...register("firstName")}
                    id="firstname"
                    type="text"
                    placeholder="abc"
                    size={40}
                    onKeyDown={(e) => handleEnterKeyEvent(e)}
                    autoComplete="off"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="lastname"
                    className="font-normal text-xl dark:text-effect-light"
                  >
                    Last name
                  </Label>
                  <Input
                    {...register("lastName")}
                    id="lastname"
                    type="text"
                    placeholder="abc"
                    size={40}
                    onKeyDown={(e) => handleEnterKeyEvent(e)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>
                  {errors.firstName && (
                    <span className="text-red-600">
                      {errors.firstName.message}
                    </span>
                  )}
                </span>
                <span>
                  {errors.lastName && (
                    <span className="text-red-600">
                      {errors.lastName.message}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="font-normal text-xl dark:text-effect-light"
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
              <Label
                htmlFor="phonenumber"
                className="font-normal text-xl dark:text-effect-light"
              >
                Phone number
              </Label>
              <Input
                {...register("phoneNumber")}
                id="phonenumber"
                type="text"
                placeholder="123-45-678"
                size={40}
                onKeyDown={(e) => handleEnterKeyEvent(e)}
                autoComplete="off"
              />
              {errors.phoneNumber && (
                <div className="text-red-600">{errors.phoneNumber.message}</div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="font-normal text-xl dark:text-effect-light"
                >
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  type={passwordVisibility ? "text" : "password"}
                  onKeyDown={(e) => handleEnterKeyEvent(e)}
                  size={40}
                  autoCorrect="off"
                  className="pr-20"
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
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2 mb-4">
                  <Label
                    htmlFor="gender"
                    className="font-normal text-xl dark:text-effect-light"
                  >
                    Gender
                  </Label>
                  <Select defaultValue={Gender.MALE}>
                    <SelectTrigger className="w-full text-black dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(Gender).map((gender, index) => (
                          <SelectItem
                            key={index}
                            value={gender[1]}
                            className="text-black dark:text-white"
                          >
                            {gender[0]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 mb-4">
                  <Label
                    htmlFor="birthday"
                    className="font-normal text-xl dark:text-effect-light"
                  >
                    Birthday
                  </Label>
                  <Popover>
                    <PopoverTrigger className="relative">
                      <CalendarIcon className="mr-2 w-4 absolute top-2 left-2 dark:text-cyan-600" />
                      <Input
                        {...register("birthDay")}
                        id="birthday"
                        contentEditable="false"
                        className={cn(
                          "w-full font-normal pl-8",
                          !date && "text-muted-foreground"
                        )}
                        size={40}
                        onKeyDown={(e) => handleEnterKeyEvent(e)}
                        value={date && format(date, "PPP")}
                        placeholder="Pick a date"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span></span>
                <span>
                  {errors.birthDay && (
                    <span className="text-red-600">
                      {errors.birthDay.message}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <Button type="submit" variant="default" className="w-full">
              Signup
            </Button>
          </div>
          <div className="mt-4 text-center text-sm dark:text-white">
            Already have an account?{" "}
            <NavLink
              to="/login"
              unstable_viewTransition={true}
              className="hover:underline text-cyan-500"
            >
              Login
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

export default Signup;
