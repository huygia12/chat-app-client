import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";
import { SignupFormProps, SignupSchema } from "@/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCustomNavigate from "@/hooks/use-custom-navigate";
import { Gender } from "@/utils/enums";
import { userService } from "@/services/apis";

const Signup: FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormProps>({
    resolver: zodResolver(SignupSchema),
  });
  const [date, setDate] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>(Gender.MALE);
  const [passwordVisibility, setPasswordvisibility] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const { navigate } = useCustomNavigate();

  const handleSignupFormSubmission: SubmitHandler<SignupFormProps> = async (
    data
  ) => {
    try {
      await userService.signup(data, date, selectedAvatarIndex);

      console.debug("signup successful");
      navigate("/login", { unstable_viewTransition: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          setError("email", {
            message: "This email has been used!",
          });
        } else if (
          error.response?.status == HttpStatusCode.BadRequest &&
          String(error.response?.data?.message ?? "").includes("Date of birth")
        ) {
          setError("birthDay", {
            message: error.response.data.message,
          });
        } else {
          setError("root", {
            message: "Register failure!",
          });
        }
        // Handle error response if available
        console.error(`Error response: ${JSON.stringify(error.response)}`);
      } else {
        console.error("Unexpected error:", error);
        setError("root", {
          message: "Register failure!",
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
                defaultValue={"Hoàng"}
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
                    defaultValue={"Nguyễn"}
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
                    defaultValue={"Huy"}
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
                defaultValue={"hoang@gmail.com"}
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
                defaultValue={"123456678"}
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
                  defaultValue={"123456"}
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
                  <Select
                    defaultValue={gender}
                    onValueChange={(value) => setGender(value)}
                  >
                    <SelectTrigger
                      value={gender}
                      {...register("gender")}
                      className="w-full text-black dark:text-white"
                    >
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
                        className={cn(
                          "w-full font-normal pl-8",
                          !date && "text-muted-foreground"
                        )}
                        size={40}
                        onKeyDown={(e) => handleEnterKeyEvent(e)}
                        value={formatDate(date, "yyyy-MM-dd")}
                        placeholder="Pick a date"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>
                  {errors.gender && (
                    <span className="text-red-600">
                      {errors.gender.message}
                    </span>
                  )}
                </span>
                <span>
                  {errors.birthDay && (
                    <span className="text-red-600">
                      {errors.birthDay.message}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <Carousel className="mt-4">
              <ChevronDown
                size={30}
                className="text-effect-dark absolute top-[-2rem] left-[10rem]"
              />
              <CarouselContent>
                <CarouselItem className="basis-1/3" />
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center basis-1/3"
                  >
                    <Avatar className="h-[4rem] cursor-pointer w-fit">
                      <AvatarImage
                        src={`/avt-template/avt${index + 1}.png`}
                        alt={`AVT-${index + 1}`}
                        className="h-[4rem] object-cover"
                      />
                      <AvatarFallback>{`AVT-${index + 1}`}</AvatarFallback>
                    </Avatar>
                  </CarouselItem>
                ))}
                <CarouselItem className="basis-1/3" />
              </CarouselContent>
              <ChevronUp
                size={30}
                className="text-effect-dark absolute bottom-[-2rem] left-[10rem]"
              />
              <CarouselPrevious
                onClickCapture={() =>
                  setSelectedAvatarIndex(selectedAvatarIndex - 1)
                }
                className="left-[1rem] h-[5rem] w-[5rem] !opacity-0"
              />
              <CarouselNext
                onClickCapture={() =>
                  setSelectedAvatarIndex(selectedAvatarIndex + 1)
                }
                className="right-[1rem] h-[5rem] w-[5rem] !opacity-0"
              />
            </Carousel>
            <Button type="submit" variant="default" className="mt-5 w-full">
              Signup
            </Button>
            {errors.root && (
              <span className="text-red-600">{errors.root.message}</span>
            )}
          </div>
          <div className="text-center text-sm dark:text-white">
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
